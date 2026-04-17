import type { Response, Request } from "express";
import pool from "../db/index.js";

export async function addNewStatement(req: Request, res: Response) {
  const data: {
    user_id: number;
    content: string;
    domain: string;
  } = req.body;

  const { rows } = await pool.query(
    `
            INSERT INTO statements (user_id, content, domain) VALUES ($1,$2,$3)
            RETURNING id;
        `,
    [data.user_id, data.content, data.domain],
  );

  // Temporary
  await pool.query(
    `
            INSERT INTO arguments (user_id, content, content_keyword, statement_id) VALUES ($1,$2,$3,$4);
        `,
    [data.user_id, data.content, "", rows[0].id],
  );

  return res.status(200).json({message: `Statement with id: ${rows[0].id} added successfully!`})
}
