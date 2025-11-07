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

        if (top_up_amount < 0) {
          const err = new Error(
            "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
          );
          err.status = 400;
          throw err;
        }

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
      } else if (error.status === 400) {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }
      next(error);
    }
  }

  //   Transaction History
  static async showRecord(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const bearerToken = authHeader.split(" ")[1];
        const payload = decodeToken(bearerToken);
        const email = payload.email;

        // ambil dari query params (optional)
        const offset = parseInt(req.query.offset) || 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 0;

        console.log(offset);
        console.log(limit);

        let record = await TransactionModel.records(email, limit, offset);
        res.status(200).json({
          status: 0,
          message: "Get History Berhasil",
          data: {
            offset: offset,
            limit: limit,
            records: record,
          },
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
