import { Pool } from "pg";
import config from "../config/index.js";

const pool = new Pool({
  connectionString: config.db.url,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  }
  console.log("✅ Database connected");
  release();
});

export default pool;
