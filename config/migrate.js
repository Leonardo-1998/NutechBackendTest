import pool from "./config.js";

console.log("=====Migrate=====");

const migrate = async () => {
  try {
    let queryDropTableUser = `
      DROP TABLE IF EXISTS users CASCADE;;
    `;
    let queryDropTableTransaction = `
      DROP TABLE IF EXISTS records CASCADE;
    `;

    let { rows: dropUser } = await pool.query(queryDropTableUser);
    // let { rows: dropBanner } = await pool.query(queryDropTableBanner);
    let { rows: dropTransaction } = await pool.query(queryDropTableTransaction);

    if (dropUser) {
      console.log("Successfuly drop table User");
    }
    // if (dropBanner) {
    //   console.log("Successfuly drop table Banner");
    // }
    if (dropTransaction) {
      console.log("Successfuly drop table TransactionHistory");
    }

    let createUsersTable = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR NOT NULL,
            first_name VARCHAR NOT NULL,
            last_name VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            profile_image VARCHAR NOT NULL,
            balance INTEGER NOT NULL
        )
    `;

    let { rows: userTable } = await pool.query(createUsersTable);

    if (userTable) {
      console.log("===== Success =====");
      console.log("Create User Table");
      console.log("===== ------- =====");
    }

    // let createBannerTable = `
    //     CREATE TABLE "Banners" (
    //         id SERIAL PRIMARY KEY NOT NULL,
    //         banner_name VARCHAR NOT NULL,
    //         banner_image VARCHAR NOT NULL,
    //         description VARCHAR NOT NULL
    //     )
    // `;

    // let { rows: bannerTable } = await pool.query(createBannerTable);

    // if (bannerTable) {
    //   console.log("===== Success =====");
    //   console.log("Create Banner Table");
    //   console.log("===== ------- =====");
    // }

    // let createServiceTable = `
    //     CREATE TABLE public.services (
    //   id serial NOT NULL,
    //   service_code varchar NULL,
    //   service_name varchar NULL,
    //   service_icon varchar NULL,
    //   service_tariff varchar NULL,
    //   CONSTRAINT services_pk PRIMARY KEY (id)
    // );
    // `;

    // let { rows: servicesTable } = await pool.query(createServiceTable);

    // if (bannerTable) {
    //   console.log("===== Success =====");
    //   console.log("Create Banner Table");
    //   console.log("===== ------- =====");
    // }

    let createRecordsTable = `
        CREATE TABLE records (
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

    let { rows: recordTable } = await pool.query(createRecordsTable);

    if (recordTable) {
      console.log("===== Success =====");
      console.log("Create Transaction History Table");
      console.log("===== ------- =====");
    }
  } catch (error) {
    console.log("=====Error=====");
    console.log(error);
  }
};

migrate();
