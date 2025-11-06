import InformationModel from "../models/InformationModel.js";

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

  static async X() {
    try {
    } catch (error) {}
  }
}

export default InformationController;
