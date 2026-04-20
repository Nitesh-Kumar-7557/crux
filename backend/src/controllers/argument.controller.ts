import type { Response, Request } from "express";
import pool from "../db/index.js";


export async function addNewArgument(req: Request, res: Response) {
  const data: {
    user_id: number;
    content: string;
    content_keyword: string;
    domain: string;
  } = req.body;

  const { rows } = await pool.query(
    `
            INSERT INTO arguments (user_id, content_keyword, content, domain) VALUES ($1,$2,$3,$4)
            RETURNING id;
        `,
    [data.user_id, data.content_keyword, data.content, data.domain],
  );


  return res.status(200).json({message: `Argument with id: ${rows[0].id} added successfully!`})
}

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