import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "Nutech_Test_DB",
});

export default pool;
