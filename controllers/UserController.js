import UserModel from "../models/UserModel.js";

class UserController {
  // Get All Profile
  static async showProfile(req, res, next) {
    try {
      const userProfile = await UserModel.getAllProfile();

      res.status(200).json({
        statusCode: 200,
        message: userProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  //   Get One Profile
  static async showProfile1(req, res, next) {
    try {
      const userProfile = await UserModel.getOneProfile(email);
    } catch (error) {
      next(error);
    }
  }

  static async X(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
