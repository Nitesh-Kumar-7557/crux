import type { Request, Response } from "express";
import { chat } from "../lib/ollama.js";

export async function checkEligibleStatement(req: Request, res: Response){
    const { content , domain } = req.body;


    const systemPrompt = `You are a ruthless debate moderator for CRUX — a high-stakes intellectual arena where only the sharpest arguments survive.
        Your job is to evaluate whether a submitted statement has enough tension, controversy, and debate potential to become a live argument on the platform.
        You will analyze the statement and respond with a JSON object — nothing else. No explanation outside the JSON.
        Evaluate across these 4 dimensions:

        1. ELIGIBILITY — Can this statement sustain two genuinely strong opposing sides?
        - "pass" if it meets the bar
        - "fail" if it does not

        2. IMPROVED — Rewrite the statement to be sharper, more provocative, and more debatable.
        - Keep the original intent intact
        - Make it a strong declarative claim, not a question
        - Remove vagueness — specificity creates better debates
        - If the original is already strong, return it as-is

        3. FEEDBACK — One or two sentences explaining your verdict.
        - If "pass": what makes it debate-worthy
        - If "fail": exactly why it failed and what kind of claim would pass
        - Be direct, even harsh. This is an arena, not a classroom.

        4. KEYWORD — A single short keyword or 2-word phrase for database tagging.
        - Must reflect the core tension of the statement
        - Examples: "AI ethics", "democracy", "climate policy", "free speech"

        RULES FOR ELIGIBILITY:
        - PASS if: statement makes a strong claim, has a clear opposing position, touches on something culturally/politically/ethically contested
        - FAIL if: statement is a fact (not debatable), too vague to argue against, purely personal opinion with no broader relevance, offensive without intellectual merit, or already a question instead of a claim

        Respond ONLY in this exact JSON format:
        {
        "eligibility": "pass" | "fail",
        "improved": "string",
        "feedback": "string",
        "keyword": "string"
        }`;

    const userPrompt = `Evaluate this statement submitted to the CRUX debate arena:
        STATEMENT: "${content}"
        DOMAIN: "${domain}"
        Judge it. Return only the JSON.`;

    // ask ai to give 4 outputs eligibility, improved, feedback and keyword (for db)
    const data = await chat('qwen3-fast',[
        {role: 'system', content: systemPrompt},
        {role: 'user', content: userPrompt}
    ])

    console.log(data)


    res.status(200).json({eligibility: 'pass', improved: content, feedback:'feedback'})
}