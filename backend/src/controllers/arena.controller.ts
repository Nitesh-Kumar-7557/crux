import type { Response, Request } from "express";
import pool from "../db/index.js";

export async function getActiveCardData(req: Request, res: Response){
    try{
        const argument = await pool.query(`
                SELECT id, user_id, content, domain, affirmative, negative
                FROM arguments a
                ORDER BY a.id DESC
                LIMIT 1;
            `)
        if(argument.rows.length === 0){
            return res.status(200).json({})
        }
        const user = await pool.query(`
                SELECT username FROM users WHERE id = $1;
            `,[argument.rows[0].user_id])
        const comments = await pool.query(`
                SELECT COUNT(id) FROM comments WHERE argument_id = $1;
            `,[argument.rows[0].id])
    
        res.status(200).json({
            domain: argument.rows[0].domain,
            argumentId: argument.rows[0].id,
            username: user.rows[0].username,
            content: argument.rows[0].content,
            affirmative: argument.rows[0].affirmative,
            negative: argument.rows[0].negative,
            count_comments: parseInt(comments.rows[0].count),
        })
    }
    catch(err){
        console.error(err)
        res.status(200).json({})
    }
}

export async function getTrendingCardData(req: Request, res: Response){
    try {
        const argument = await pool.query(`
                SELECT 
                    u.username,
                    a.domain,
                    a.content AS title,
                    a.affirmative AS affirmativeScore,
                    a.negative AS negativeScore,
                    a.id AS argumentId
                FROM arguments a
                JOIN users u ON a.user_id = u.id
                ORDER BY a.id DESC
                LIMIT 7;
            `)
        if(argument.rows.length === 0){
            return res.status(200).json({})
        }
    
        res.status(200).json(argument.rows)
    }
    catch(err){
        console.error(err)
        res.status(200).json({})
    }
}

export async function getNewestCardData(req: Request, res: Response){
    try {
        const argument = await pool.query(`
                SELECT 
                    u.username,
                    a.domain,
                    a.content AS title,
                    a.affirmative AS affirmativeScore,
                    a.negative AS negativeScore,
                    a.id AS argumentId,
                    a.created_at AT TIME ZONE 'UTC' AS time,
                    COALESCE(fc.for_count, 0) + COALESCE(ac.against_count, 0) AS argumentNum
                FROM arguments a
                JOIN users u ON a.user_id = u.id
                LEFT JOIN (
                    SELECT argument_id, COUNT(*) AS for_count
                    FROM for_comments
                    GROUP BY argument_id
                ) fc ON a.id = fc.argument_id
                LEFT JOIN (
                    SELECT argument_id, COUNT(*) AS against_count
                    FROM against_comments
                    GROUP BY argument_id
                ) ac ON a.id = ac.argument_id
                ORDER BY a.id DESC
                LIMIT 20;
            `)
        if(argument.rows.length === 0){
            return res.status(200).json({})
        }
    
        res.status(200).json(argument.rows)
    }
    catch(err){
        console.error(err)
        res.status(200).json({})
    }
}