import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : undefined,

  host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
  port: process.env.DATABASE_URL ? undefined : process.env.DB_PORT,
  database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
  user: process.env.DATABASE_URL ? undefined : process.env.DB_USER,
  password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,

  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export default pool;