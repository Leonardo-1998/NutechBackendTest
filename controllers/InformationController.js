import InformationModel from "../models/InformationModel.js";
import { decodeToken } from "../utils/jwt.js";

class InformationController {
  static async showAllBanner() {
    try {
      const banner = await InformationModel.getAllBanner();

      res.status(200).json({
        status: 0,
        message: "Sukses",
        data: banner,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showServices() {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const bearerToken = authHeader.split(" ")[1];
        const payload = decodeToken(bearerToken);
        const email = payload.email;

        const services = await InformationModel.services();

        console.log(services);
        res.status(200).json({
          status: 0,
          message: "Suskes",
          data: services,
        });
      } else {
        const err = new Error("Token tidak tidak valid atau kadaluwarsa");
        err.status = 401;
        throw err;
      }
    } catch (error) {
      if (error.status === 401) {
        return res.status(401).json({
          status: 108,
          message: error.message,
          data: null,
        });
      }
    }
  }
}

export default InformationController;
