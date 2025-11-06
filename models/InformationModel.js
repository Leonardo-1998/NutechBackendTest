import pool from "../config/config.js";
import Banner from "../class/BannerClass.js";
import Service from "../class/ServiceClass.js";

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

  static async getAllServices() {
    try {
      const getServicesQuery = `
            SELECT *
            FROM services
        `;

      let { rows: allServices } = await pool.query(getServicesQuery);

      allServices = allServices.map((el) => {
        return new Service(
          el.service_code,
          el.service_name,
          el.service_icon,
          el.service_tariff
        );
      });

      return allServices;
    } catch (error) {
      throw error;
    }
  }
}

export default InformationModel;
