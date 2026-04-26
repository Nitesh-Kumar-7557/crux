import type { Request, Response } from "express";
import pool from "../db/index.js";
import { groqGPT } from "../ai/groq.js";
import { jsonrepair } from "jsonrepair";

async function updateAnalysis(argumentId: number, side: string, userId: string, input: string){

    const data1 = await pool.query(`
            SELECT content FROM arguments WHERE id = $1;
        `,[argumentId])

    const data2 = await pool.query(`
            SELECT u.name, c.content
            FROM users AS u
            JOIN comments AS c ON u.id = c.user_id
            WHERE side = $1 AND c.argument_id = $2;
        `,[side, argumentId])

    const argumentContent = data1.rows[0].content;
    const previousComments = data2.rows;

    const systemPrompt = `You are CRUX ANALYST — an elite debate scorer inside a high-stakes intellectual arena.

            You will be given:
            - The argument statement being debated
            - The side being argued (FOR or AGAINST)
            - All existing comments from that side with their authors

            Your job: evaluate a NEW comment submitted to this side and return a JSON object only.

            RETURN ONLY a raw JSON object. No markdown. No explanation. No preamble.

            ---

            OUTPUT SCHEMA:
            {
            "points": number,       // integer between 4 and 8
            "newAnalysis": "string" // updated analysis paragraph, max 120 words
            }

            ---

            SCORING RULES FOR [points] — scale of 4 to 8:

            Score 8 — Exceptional
            - Introduces a completely new angle not present in any existing comment
            - Backed by logic, data, analogy, or real-world example
            - Directly strengthens the side's position against the opposition

            Score 6-7 — Strong
            - Adds meaningful substance beyond what's already been said
            - Logically sound, on-topic, advances the side's case

            Score 4-5 — Average
            - Relevant but repeats points already made by others
            - Correct but adds no new intellectual weight

            DEDUCT 1 point if the comment:
            - Directly copies or paraphrases an existing comment from the list
            - Contains a detectable logical fallacy

            NEVER go below 4 or above 8.

            ---

            RULES FOR [newAnalysis]:
            - Format the output in clean Markdown.
            - NO top-level heading. Start directly with content.

            - First section — no heading, just a plain paragraph:
                - 2-3 sentences analyzing the possibilities and potential strength of this side (FOR or AGAINST) in context of the argument statement
                - What is the ceiling of this side's position? What's the strongest case this side could theoretically make?
                - Do NOT summarize what users said here — this is about the side's inherent debate potential

            - Then: ### Key Arguments
                - Bullet points, one per distinct argument made by users
                - Format each bullet: **[Name]** — their point in one sharp sentence
                - Skip weak or repetitive comments silently

            - Then: ### Strongest Points
                - 2-3 bullet points max
                - Each bullet: the single sharpest, hardest-to-refute argument made on this side so far
                - Attribute by name: **[Name]** — why this point lands
                - If only one strong point exists, list only one

            - Tone: sharp analyst, not a cheerleader
            - Hard limit: 150 words
            - No filler. No repetition across sections.

            ---

            ARGUMENT STATEMENT:
            "${argumentContent}"

            SIDE BEING ARGUED: ${side.toUpperCase()}

            EXISTING COMMENTS ON THIS SIDE:
            ${previousComments.length > 0
                ? previousComments.map((c: {name: string, content: string}) => `- ${c.name}: "${c.content}"`).join('\n')
                : 'No comments yet. This is the first comment on this side.'
            }`;

    const userPrompt = `NEW COMMENT SUBMITTED:
            "${input}"

            Score this comment and return updated analysis. Return raw JSON only.`;

    const raw = await groqGPT(systemPrompt, userPrompt)

    const repaired = jsonrepair(raw);
    const parsed = JSON.parse(repaired);

    const points = Math.round(parsed.points)

    await pool.query(`
            UPDATE users
            SET logic_score = logic_score + $2
            WHERE id = $1;
        `,[userId, points])

    await pool.query(`
            UPDATE arguments
            SET ${side}_analysis = $1
            WHERE id = $2;
        `,[parsed.newAnalysis, argumentId])
}

export async function getComments(req: Request, res: Response){
    const {id} = req.params;
    const comments = await pool.query(`
            SELECT c.id AS comment_id, u.username, c.side, u.logic_score, c.content, c.likes
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.argument_id = $1;
        `,[Number(id)])
    res.status(200).json({comments: comments.rows})
}

export async function postAffirmativeComment(req: Request, res: Response){
    const {id} = req.params;
    const {userId, input} = req.body;
    const argumentId = Number(id);

    try{
        await pool.query(`
            INSERT INTO comments(argument_id, user_id, content, side) VALUES ($1,$2,$3,'for')
            `,[argumentId, userId, input])
        await updateAnalysis(argumentId, 'for', userId, input);
            res.status(201).json({message: "Successfully comment posted!"})
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error in comment posting!"})
    }

}

export async function postNegativeComment(req: Request, res: Response){
    const {id} = req.params;
    const {userId, input} = req.body;
    const argumentId = Number(id);

    try{
        await pool.query(`
            INSERT INTO comments(argument_id, user_id, content, side) VALUES ($1,$2,$3,'against')
            `,[argumentId, userId, input])
        await updateAnalysis(argumentId, 'against', userId, input);
        res.status(201).json({message: "Successfully comment posted!"})
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error in comment posting!"})
    }

}