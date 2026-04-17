import type { Response, Request } from "express";
import pool from "../db/index.js";

export async function getActiveCardData(req: Request, res: Response){
    try{
        const argument = await pool.query(`
                SELECT id, user_id, content, statement_id, affirmative, negative
                FROM arguments LIMIT 1;
            `)
        if(argument.rows.length === 0){
            return res.status(200).json({})
        }
        const domain = await pool.query(`
                SELECT domain
                FROM statements WHERE id = $1;
            `,[argument.rows[0].statement_id])
        const user = await pool.query(`
                SELECT username FROM users WHERE id = $1;
            `,[argument.rows[0].user_id])
        const forComments = await pool.query(`
                SELECT COUNT(id) FROM for_comments WHERE argument_id = $1;
            `,[argument.rows[0].id])
        const againstComments = await pool.query(`
                SELECT COUNT(id) FROM against_comments WHERE argument_id = $1;
            `,[argument.rows[0].id])
    
        res.status(200).json({
            domain: domain.rows[0].domain,
            argumentId: argument.rows[0].id,
            username: user.rows[0].username,
            content: argument.rows[0].content,
            affirmative: argument.rows[0].affirmative,
            negative: argument.rows[0].negative,
            count_comments: parseInt(forComments.rows[0].count) + parseInt(againstComments.rows[0].count),
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
                    s.domain,
                    s.content AS title,
                    a.affirmative AS affirmativeScore,
                    a.negative AS negativeScore,
                    a.id AS argumentId
                FROM arguments a
                JOIN statements s ON a.statement_id = s.id
                JOIN users u ON a.user_id = u.id
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