import pg from "pg";
const { Pool, Client } = pg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 54632,
  database: "mydb",
});

module.exports = pool;
