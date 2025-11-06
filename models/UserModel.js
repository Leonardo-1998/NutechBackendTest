import pool from "../config/config.js";
import User from "../class/UserClass.js";
import { hash, compare } from "../utils/bcrypt.js";
import { token } from "../utils/jwt.js";

class UserModel {
  // Membuat user baru
  static async createNewUser(email, first_name, last_name, password) {
    try {
      const profileQuery = `
            INSERT INTO users (email, first_name , last_name, password) 
            VALUES ($1, $2, $3, $4);
        `;

      const hashedPassword = await hash(password);

      const values = [email, first_name, last_name, hashedPassword];

      await pool.query(profileQuery, values);
    } catch (error) {
      throw error;
    }
  }

  // Cek password dengan email
  static async checkMembership(email, password) {
    try {
      const queryByEmail = `
        SELECT *
        FROM users u
        WHERE u.email = $1
      `;

      const values = [email];

      let { rows: user } = await pool.query(queryByEmail, values);

      if (user.length === 0) {
        const err = new Error("Email atau password salah!");
        err.status = 401;
        throw err;
      }

      const userPassword = user[0].password;

      const match = await compare(password, userPassword);

      if (match) {
        const tokenJWT = token(email);

        return tokenJWT;
      } else {
        const err = new Error("Email atau password salah!");
        err.status = 401;
        throw err;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOneProfile(email) {
    try {
      let profileQuery = `
            SELECT *
            FROM users u 
            WHERE u.email = $1
        `;

      const { row: oneProfile } = await pool.query(profileQuery, [email]);

      oneProfile = oneProfile.map((el) => {
        return new User(
          el.id,
          el.email,
          el.first_name,
          el.last_name,
          el.password
        );
      });
      return oneProfile;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProfile() {
    try {
      let profileQuery = `
            SELECT *
            FROM users u
        `;

      let { rows: allProfile } = await pool.query(profileQuery);

      allProfile = allProfile.map((el) => {
        return new User(
          el.id,
          el.email,
          el.first_name,
          el.last_name,
          el.password
        );
      });

      return allProfile;
    } catch (error) {
      throw error;
    }
  }

  static async X() {
    try {
    } catch (error) {
      throw error;
    }
  }
}

export default UserModel;
