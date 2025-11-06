import pool from "../config/config.js";
import User from "../class/UserClass.js";
import { hash, compare } from "../utils/bcrypt.js";
import { token } from "../utils/jwt.js";

class UserModel {
  // Membuat user baru
  static async createNewUser(email, first_name, last_name, password) {
    try {
      const registered = await this.membershipProfile(email);
      if (registered) {
        const err = new Error("Email sudah digunakan untuk registrasi!");
        err.status = 400;
        throw err;
      }

      const profileQuery = `
            INSERT INTO users (email, first_name , last_name, password, profile_image) 
            VALUES ($1, $2, $3, $4, $5);
        `;

      const hashedPassword = await hash(password);

      const values = [
        email,
        first_name,
        last_name,
        hashedPassword,
        "https://picsum.photos/200",
      ];

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
        const tokenJWT = token({ email: user[0].email });

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

  // Mengambil profile bedasarkan email
  static async membershipProfile(email) {
    try {
      let profileQuery = `
            SELECT *
            FROM users u 
            WHERE u.email = $1
      `;

      const values = [email];

      let { rows: profile } = await pool.query(profileQuery, values);
      // console.log(profile);

      profile = profile.map((el) => {
        return new User(
          el.id,
          el.email,
          el.first_name,
          el.last_name,
          el.password,
          el.profile_image
        );
      });

      const filteredProfile = {
        email: profile[0].email,
        first_name: profile[0].first_name,
        last_name: profile[0].last_name,
        profile_image: profile[0].profile_image,
      };

      return filteredProfile;
    } catch (error) {
      throw error;
    }
  }

  // Update Profile
  static async updateProfile(email, first_name, last_name) {
    try {
      let profileQuery = `
            UPDATE users u
            SET first_name = $2, last_name = $3
            WHERE u.email = $1
      `;

      const values = [email, first_name, last_name];

      await pool.query(profileQuery, values);

      let profile = this.membershipProfile(email);

      return profile;
    } catch (error) {
      throw error;
    }
  }

  // Update Profile Image
  static async updateProfileImage(email, profile_image) {
    try {
      let profileQuery = `
            UPDATE users u
            SET profile_image = $2
            WHERE u.email = $1
      `;

      const values = [email, profile_image];

      await pool.query(profileQuery, values);

      let profile = this.membershipProfile(email);

      return profile;
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
