import type { Request, Response } from "express";
import { chat } from "../lib/ollama.js";
import { jsonrepair } from 'jsonrepair';

export async function checkEligibleStatement(req: Request, res: Response) {
    const { content, domain } = req.body;


    const systemPrompt = `You are a JSON generator. You output only JSON. Nothing else.

        You will evaluate a debate statement and return this exact JSON structure with no deviations:
        {"eligibility":"pass","improved":"...","feedback":"...","keyword":"..."}

        STRICT OUTPUT RULES — violating any of these will break the system:
        - Output ONLY the JSON object. No markdown, no backticks, no thinking, no explanation.
        - Every key must be double-quoted.
        - Every value must be a single double-quoted string.
        - The object must have EXACTLY these 4 keys: eligibility, improved, feedback, keyword.
        - No duplicate keys. No extra keys. No arrays.
        - "eligibility" must be exactly "pass" or "fail".
        - "improved" must be under 15 words.
        - "feedback" must be under 30 words.
        - "keyword" must be 1-3 words only.

        EVALUATION CRITERIA:
        - PASS if: strong claim, clear opposing position, culturally/politically/ethically contested.
        - FAIL if: undisputable fact, too vague, purely personal, offensive without merit, or a question.
        - "improved": sharper, more provocative rewrite. Keep original intent.
        - "keyword": reflects the core tension of the statement only.`;

    const userPrompt = `Evaluate this statement submitted to the CRUX debate arena:
            STATEMENT: "${content}"
            DOMAIN: "${domain}"
            Return only the raw JSON object.`;


    try {
        const raw = await chat([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ])

        
        const cleaned = raw.replace(/```json|```/g, '').trim();

        const repaired = jsonrepair(cleaned);
        const parsed = JSON.parse(repaired);

        res.status(200).json({
            eligibility: parsed.eligibility,
            improved:    parsed.improved,
            feedback:    parsed.feedback,
        })
    } catch (err) {
        console.error(err)
    }


}