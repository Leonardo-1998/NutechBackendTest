import bcrypt from "bcryptjs";

// Hash password
const salt = bcrypt.genSaltSync(10);
export const hash = (password) => {
  return bcrypt.hash(password, salt);
};

// Compare password
export const compare = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
