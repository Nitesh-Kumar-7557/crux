import pool from "../db/index.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto";

interface TokenPayload {
  id: number;
  role: string;
  username: string;
  email: string;
}

export function createAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, config.jwt_secret as string, { expiresIn: "15m" });
}

export function createRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

export async function saveRefreshTokenToDB(userId: number, token: string) {
  await pool.query(
    `
      INSERT INTO refresh_tokens (user_id,token,expires_at) VALUES (
        $1, $2, NOW() + INTERVAL '7 days'
      )
    `,
    [userId, token],
  );
}

export async function deleteRefreshTokenFromDB(token: string) {
  await pool.query(
    `
      DELETE FROM refresh_tokens WHERE token = $1
    `,
    [token],
  );
}

export async function findRefreshToken(token: string) {
  const { rows } = await pool.query(
    `
            SELECT u.id,u.role,u.username,u.email
            FROM refresh_tokens rt
            JOIN users u ON rt.user_id = u.id
            WHERE rt.token = $1
            AND rt.expires_at > NOW()
        `,
    [token],
  );
  return rows[0] || null;
}
