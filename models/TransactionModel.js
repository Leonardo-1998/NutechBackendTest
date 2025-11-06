import User from "../class/UserClass.js";
import pool from "../config/config.js";

class TransactionModel {
  // Show Balance
  static async showBalance(email) {
    try {
      let profileQuery = `
            SELECT *
            FROM users u 
            WHERE u.email = $1
      `;

      const values = [email];

      let { rows: user } = await pool.query(profileQuery, values);

      user = user.map((el) => {
        return new User(
          el.id,
          el.email,
          el.first_name,
          el.last_name,
          el.password,
          el.profile_image,
          el.balance
        );
      });

      return user[0].balance;
    } catch (error) {
      console.log(error);
    }
  }

  //   Add Balance
  static async addBalance(email, top_up_amount) {
    try {
      const balance = await this.showBalance(email);
      console.log(balance);
      let newBalance = balance + top_up_amount;
      console.log("============");
      console.log(newBalance);

      const valuesTopUp = [email, newBalance];
      let updateBalanceQuery = `
            UPDATE users u
            SET balance = $2
            WHERE u.email = $1
      `;

      await pool.query(updateBalanceQuery, valuesTopUp);

      newBalance = await this.showBalance(email);

      return newBalance;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TransactionModel;
