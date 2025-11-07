import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   user: "postgres",
//   password: "postgres",
//   host: "localhost",
//   port: 5432,
//   database: "Nutech_Test_DB",
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
