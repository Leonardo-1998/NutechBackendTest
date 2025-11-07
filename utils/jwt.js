import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

export const token = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      const err = new Error("Token tidak tidak valid atau kadaluwarsa");
      err.status = 401;
      throw err;
    }
  }
};
