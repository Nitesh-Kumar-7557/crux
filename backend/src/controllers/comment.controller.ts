import type { Request, Response } from "express";
import pool from "../db/index.js";

export async function getComments(req: Request, res: Response){
    const {id} = req.params;
    const forComments = await pool.query(`
            SELECT u.username, c.content, c.likes
            FROM for_comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.argument_id = $1;
        `,[Number(id)])
    const againstComments = await pool.query(`
            SELECT u.username, c.content, c.likes
            FROM against_comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.argument_id = $1;
        `,[Number(id)])
    res.status(200).json({forComments: forComments.rows, againstComments: againstComments.rows})
}

export async function postAffirmativeComment(req: Request, res: Response){
    const {id} = req.params;
    const {userId, input} = req.body;
    try{
        await pool.query(`
                INSERT INTO for_comments(argument_id, user_id, content) VALUES ($1,$2,$3)
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
                INSERT INTO against_comments(argument_id, user_id, content) VALUES ($1,$2,$3)
            `,[id, userId, input])
        
        res.status(201).json({message: "Successfully comment posted!"})
    } catch(err){
        console.log(err)
        res.status(500).json({error: "Error in comment posting!"})
    }

}