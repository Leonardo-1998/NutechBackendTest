import pool from "../config/config.js";
import User from "../class/UserClass.js";
import { hash, compare } from "../utils/bcrypt.js";
import { token } from "../utils/jwt.js";

class UserModel {
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

  static async checkMembership(email, password) {
    try {
      const queryByEmail = `
        SELECT password
        FROM users u
        WHERE u.email = $1
      `;

      const values = [email];

      let { rows: userPassword } = await pool.query(queryByEmail, values);

      if (compare(password, userPassword)) {
        const payload = email;
      } else {
        const err = new Error("Invalid Password or Email");
        err.status = 400;
        throw err;
      }
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

  static async X() {
    try {
    } catch (error) {
      throw error;
    }
  }
}

export default UserModel;
