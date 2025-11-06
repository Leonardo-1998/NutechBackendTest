const pool = require("./config");
const fs = require("fs").promises;

console.log("=====Migrate=====");

const migrate = async () => {
  try {
    let queryDropTable = `
        DROP TABLE IF EXISTS "Users", "Records"
    `;

    let { rows: dropTable } = await pool.query(queryDropTable);

    if (dropTable) {
      console.log("Successfuly drop table");
    }

    let createUsersTable = `
        CREATE TABLE "Users" (
            id SERIAL PRIMARY KEY,
            email VARCHAR,
            first_name VARCHAR,
            last_name VARCHAR,
            password VARCHAR
        )
    `;

    let { rows: userTable } = await pool.query();

    let createRecordsTable = `
        CREATE TABLE "Transaction_History" (
            id SERIAL PRIMARY KEY,
            invoice_number VARCHAR,
            service_code VARCHAR,
            service_name VARCHAR,
            transaction_type VARCHAR,
            description VARCHAR,
            total_amount INTEGER,
            created_on DATE
        )
    `;
  } catch (error) {
    console.log("=====Error=====");
    console.log(error);
  }
};

migrate();
