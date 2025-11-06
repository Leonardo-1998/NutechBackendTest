import pool from "./config.js";
import fs from "fs/promises";

const seed = async () => {
  try {
    const reset = `TRUNCATE TABLE "users", "banners" RESTART IDENTITY CASCADE;`;

    let bannerInsert = `INSERT INTO "banner" ("banner_name", "banner_image", "description")
        VALUES
        `;

    let bannerValue = JSON.parse(
      await fs.readFile("../data/banner.json", "utf-8")
    )
      .map((el) => {
        return `('${el.banner_name}', '${el.banner_image}', '${el.description}')`;
      })
      .join(", \n");

    bannerInsert += bannerValue;

    let { rows: authors } = await pool.query(bannerInsert);
  } catch (error) {
    console.log(error);
  }
};

seed();
