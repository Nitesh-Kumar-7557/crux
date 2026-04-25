import type { Request, Response } from "express";
import pool from "../db/index.js";

export async function registerLike(req: Request, res: Response){
    const {user_id,comment_id} = req.body;
    
    try{
        const {rows} = await pool.query(`
                SELECT id FROM likes
                WHERE user_id = $1 AND comment_id = $2;
            `,[user_id,comment_id])
        if(rows.length > 0){
            res.json(200).json({message: "Already Liked!"})
        }
        await pool.query(`
                INSERT INTO likes(user_id ,comment_id) VALUES ($1,$2);
            `,[user_id,comment_id]);
        await pool.query(`
                UPDATE comments
                SET likes = likes + 1
                WHERE id = $1;
            `,[comment_id]);
        res.json(201).json({message: "Successful!"})
    } catch(err){
        console.error(err)
        res.json(500).json({error: "Internal DB Error!"})
    }
}