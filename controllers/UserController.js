import UserModel from "../models/UserModel.js";
import validator from "validator";

class UserController {
  // Create New Membership / User
  static async registerUser(req, res, next) {
    try {
      let { email, first_name, last_name, password } = req.body;

      if (!email || !first_name || !last_name || !password) {
        const err = new Error("Field tidak boleh ada kosong!");
        err.status = 400;
        throw err;
      }

      if (!validator.isEmail(email)) {
        const err = new Error("Paramter email tidak sesuai format!");
        err.status = 400;
        throw err;
      }

      if (password.length < 8) {
        const err = new Error("Password Length minimal 8 karakter!");
        err.status = 400;
        throw err;
      }

      await UserModel.createNewUser(email, first_name, last_name, password);

      res.status(200).json({
        status: 0,
        message: "Registrasi berhasil silahkan login",
        data: null,
      });
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      next(error);
    }
  }

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
