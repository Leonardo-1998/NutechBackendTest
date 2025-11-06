import pool from "../config/config.js";
import Banner from "../class/BannerClass.js";

class InformationModel {
  static async getAllBanner() {
    try {
      const getBannerQuery = `
            SELECT *
            FROM banners
        `;

      let { rows: allBanner } = await pool.query(getBannerQuery);

      allBanner = allBanner.map((el) => {
        return new Banner(el.banner_name, el.banner_image, el.description);
      });

      return allBanner;
    } catch (error) {
      throw error;
    }
  }
}

export default InformationModel;
