import pool from "../config/config.js";
import User from "../class/UserClass.js";

class UserModel {
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
