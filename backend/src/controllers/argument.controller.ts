import type { Response, Request } from "express";
import pool from "../db/index.js";

export async function getArgumentById(req: Request, res: Response){
    const {id} = req.params;
    try{
        const { rows } = await pool.query(`
                SELECT * FROM "arguments" WHERE id = $1;
            `,[id])
        res.status(200).json({
            data: rows[0]
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: "Internal server error!"})
    }
}
// export async function getAllActiveArguments(req: Request, res: Response){
//     const { rows } = await pool.query(`
//             SELECT s.content, a.affirmative, a.negative, a.id 
//             FROM arguments a
//             JOIN statements s ON a.statement_id = s.id;
//         `)
//     res.status(200).json({
//         data: rows
//     })
// }