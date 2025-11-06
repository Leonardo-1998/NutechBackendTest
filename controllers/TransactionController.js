import TransactionModel from "../models/TransactionModel.js";
import { decodeToken } from "../utils/jwt.js";

class TransactionController {
  // Get Balance
  static async getBalance(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const bearerToken = authHeader.split(" ")[1];
        const payload = decodeToken(bearerToken);
        const email = payload.email;

        const balance = await TransactionModel.showBalance(email);

        res.status(200).json({
          status: 0,
          message: "Get Balance Berhasil",
          data: { balance: balance },
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
      next(error);
    }
  }

  //   Top Up
  static async addBalance(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const bearerToken = authHeader.split(" ")[1];
        const payload = decodeToken(bearerToken);
        const email = payload.email;

        const { top_up_amount } = req.body;

        const balance = await TransactionModel.addBalance(email, top_up_amount);

        res.status(200).json({
          status: 0,
          message: "Top Up Balance berhasil",
          data: { balance: balance },
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
      next(error);
    }
  }

  static async X(req, res, next) {
    try {
    } catch (error) {}
  }
}

export default TransactionController;
