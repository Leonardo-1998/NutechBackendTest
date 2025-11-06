import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const token = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
};

export const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
