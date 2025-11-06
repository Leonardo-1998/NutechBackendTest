import UserModel from "../models/UserModel.js";
import validator from "validator";
import { decodeToken } from "../utils/jwt.js";

class UserController {
  // Create New Membership / User
  static async registerUser(req, res, next) {
    try {
      let { email, first_name, last_name, password } = req.body;

      // Cek jika ada field kosong
      if (!email || !first_name || !last_name || !password) {
        const err = new Error("Field tidak boleh ada kosong!");
        err.status = 400;
        throw err;
      }

      // Cek validasi format email
      if (!validator.isEmail(email)) {
        const err = new Error("Paramter email tidak sesuai format!");
        err.status = 400;
        throw err;
      }

      // Cek panjang password apakah lebih dari 8
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
      // Jika terjadi gagal validasi
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

  // Login
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validasi ada input email dan password
      if (!email || !password || password.length < 8) {
        const err = new Error("Email atau password salah!");
        err.status = 401;
        throw err;
      }

      // Mengecek apakah benar format email
      if (!validator.isEmail(email)) {
        const err = new Error("Paramter email tidak sesuai format!");
        err.status = 400;
        throw err;
      }

      const tokenJWT = await UserModel.checkMembership(email, password);

      res.status(200).json({
        status: 0,
        message: "Login Sukses",
        data: {
          token: tokenJWT,
        },
      });
    } catch (error) {
      if (error.status === 400) {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }
      if (error.status === 401) {
        return res.status(401).json({
          status: 103,
          message: error.message,
          data: null,
        });
      }
      next(error);
    }
  }

  // Profile
  static async showProfile(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const bearerToken = authHeader.split(" ")[1];
        const payload = decodeToken(bearerToken);
        const email = payload.email;

        const profile = await UserModel.membershipProfile(email);

        console.log(profile);
        res.status(200).json({
          status: 0,
          message: "Suskes",
          data: profile,
        });
      } else {
        const err = new Error("Token tidak tidak valid atau kadaluwarsa");
        err.status = 401;
        throw err;
      }
    } catch (error) {
      if (error.status === 401) {
        res.status(401).json({
          status: 108,
          message: error.message,
          data: null,
        });
      }

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
