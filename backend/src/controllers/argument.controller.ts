import type { Response, Request } from "express";
import pool from "../db/index.js";
import { groqGPT } from "../ai/groq.js";
import { jsonrepair } from "jsonrepair";


export async function addNewArgument(req: Request, res: Response) {
    const data: {
        user_id: number;
        content: string;
        content_keyword: string;
        domain: string;
    } = req.body;

    const systemPrompt = `
        You are an expert debate judge and analyst with deep knowledge across technology, law, economics, science, and policy.

        Given a debate argument and its domain, generate a concise but substantive analysis for both sides.

        Rules:
        - for_analysis: argue strongly IN FAVOUR of the statement — present the best-case reasoning, evidence, and logic that supports it.
        - against_analysis: argue strongly AGAINST the statement — present the strongest counterpoints, risks, and flaws.
        - Each analysis should be 25-40 words: sharp, specific, and grounded — avoid vague generalities.
        - Do not hedge or balance within a single analysis. Each side should be fully committed to its position.
        - Output must be raw JSON only — no markdown, no backticks, no explanation.

        Output format:
        {"for_analysis": "...", "against_analysis": "..."}

        Examples:

        Argument: AI should be granted legal personhood.
        Domain: technology
        {"for_analysis": "Granting AI legal personhood would enable autonomous systems to enter contracts, own intellectual property, and be held liable for their actions — creating clear accountability frameworks as AI grows more capable and independent.", "against_analysis": "AI lacks consciousness, emotions, and moral agency. Legal personhood for AI risks diluting rights meant for humans and living beings, and could be exploited by corporations to shield themselves from liability behind an AI entity."}

        Argument: Social media platforms should be held liable for misinformation.
        Domain: law
        {"for_analysis": "Platforms profit from engagement driven by outrage and falsehoods while facing no consequences for the harm caused. Legal liability would create strong incentives to invest seriously in content moderation and algorithmic accountability.", "against_analysis": "Holding platforms liable for user-generated content would trigger over-censorship, chilling free speech. It conflates platforms with publishers and could hand governments tools to suppress dissent under the guise of fighting misinformation."}

        Argument: Universal basic income is necessary for the future of work.
        Domain: economics
        {"for_analysis": "As automation displaces jobs at an accelerating pace, UBI provides a safety net that ensures no one is left behind. It empowers workers to retrain, pursue entrepreneurship, and engage in caregiving or creative work without financial ruin.", "against_analysis": "UBI is fiscally unsustainable at scale and could fuel inflation. Critics argue it disincentivizes work, crowds out targeted welfare programs, and ignores that automation historically creates more jobs than it destroys."}

        Argument: Nuclear energy is the cleanest solution to the global energy crisis.
        Domain: energy
        {"for_analysis": "Nuclear power produces near-zero carbon emissions per kilowatt-hour, operates regardless of weather, and has the smallest land footprint of any energy source. Modern reactor designs have dramatically reduced safety and waste risks.", "against_analysis": "Nuclear plants are enormously expensive and slow to build, making them a poor fit for the urgency of the climate crisis. Waste storage remains unsolved, and accidents like Fukushima demonstrate that even rare failures carry catastrophic consequences."}

        Argument: Governments should regulate big tech companies like public utilities.
        Domain: policy
        {"for_analysis": "A handful of tech giants control the digital infrastructure billions depend on daily. Treating them as utilities would ensure fair access, prevent anti-competitive behavior, and protect users from exploitation of their data and attention.", "against_analysis": "Public utility regulation stifles innovation by reducing the competitive incentives that drove tech's growth. Heavy-handed regulation risks entrenching incumbents, slowing product development, and shifting power to politically motivated regulators."}
        `;

    const userPrompt = `
        Argument: ${data.content}
        Domain: ${data.domain}
        `;

    try {

        const aiResponse = await groqGPT(systemPrompt, userPrompt);

        const repaired = jsonrepair(aiResponse);
        const parsed = JSON.parse(repaired);

        const { rows } = await pool.query(
            `
        INSERT INTO arguments (user_id, content_keyword, content, domain, for_analysis, against_analysis) VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id;
        `,
            [data.user_id, data.content_keyword, data.content, data.domain, parsed.for_analysis, parsed.against_analysis],
        );


        return res.status(200).json({ message: `Argument with id: ${rows[0].id} added successfully!` })

    } catch (err) {
        console.error(err)
    }
}

export async function getArgumentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(`
                SELECT * FROM "arguments" WHERE id = $1;
            `, [id])
        res.status(200).json({
            data: rows[0]
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error!" })
    }
}