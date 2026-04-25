import type { Request, Response } from "express";
import pool from "../db/index.js";

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
    try{
        await pool.query(`
                INSERT INTO comments(argument_id, user_id, content, side) VALUES ($1,$2,$3,'for')
            `,[id, userId, input])
        
        res.status(201).json({message: "Successfully comment posted!"})
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error in comment posting!"})
    }

}

export async function postNegativeComment(req: Request, res: Response){
    const {id} = req.params;
    const {userId, input} = req.body;
    try{
        await pool.query(`
                INSERT INTO comments(argument_id, user_id, content, side) VALUES ($1,$2,$3,'against')
            `,[id, userId, input])
        
        res.status(201).json({message: "Successfully comment posted!"})
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error in comment posting!"})
    }

}

// export async function name() {
    
// }