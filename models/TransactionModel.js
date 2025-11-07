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
      throw error;
    }
  }

  //   Add Balance
  static async addBalance(email, top_up_amount) {
    try {
      const balance = await this.showBalance(email);
      let newBalance = balance + top_up_amount;

      const updateBalanceQuery = `
        UPDATE users
        SET balance = $2
        WHERE email = $1
      `;

      const valuesTopUp = [email, newBalance];

      await pool.query(updateBalanceQuery, valuesTopUp);

      this.transactionTopUp(email, "TOPUP", top_up_amount);

      newBalance = await this.showBalance(email);

      return newBalance;
    } catch (error) {
      throw error;
    }
  }

  //   Transaction Top UP
  static async transactionTopUp(email, transaction_type, total_amount) {
    try {
      const recordQuery = `
            INSERT INTO records 
              (invoice_number,
              transaction_type,
              description, 
              total_amount, 
              created_on, 
              email)
            VALUES($1, $2, $3, $4, $5, $6)
      `;

      let invoice_number = "INV17082023" + 1;
      let date = new Date();
      let amount = Number(total_amount);

      const values = [
        invoice_number,
        transaction_type,
        "Top Up balance",
        amount,
        date,
        email,
      ];

      await pool.query(recordQuery, values);

      // return newBalance;
    } catch (error) {
      throw error;
    }
  }

  // Use Service
  static async serviceUsed(email, service_code) {
    try {
      let serviceData = await this.service(service_code);

      console.log(serviceData);

      const recordQuery = `
            INSERT INTO records 
              (invoice_number,
              transaction_type,
              description, 
              total_amount, 
              created_on, 
              email)
            VALUES($1, $2, $3, $4, $5, $6)
      `;

      let invoice_number = "INV17082023" + 1;
      let date = new Date();

      const values = [
        invoice_number,
        "PAYMENT",
        serviceData[0].service_name,
        serviceData[0].service_tariff,
        date,
        email,
      ];

      await pool.query(recordQuery, values);
      const data = {
        invoice_number: invoice_number,
        service_code: serviceData[0].service_code,
        service_name: serviceData[0].service_name,
        transaction_type: "PAYMENT",
        total_amount: serviceData[0].service_tariff,
        created_on: date,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Services by type
  static async service(service_code) {
    try {
      const servicesQuery = `
            SELECT *
            FROM services
            WHERE service_code = $1
      `;

      const valuesTransaction = [service_code];

      let { rows: services } = await pool.query(
        servicesQuery,
        valuesTransaction
      );

      return services;
    } catch (error) {
      throw error;
    }
  }

  // Transaction History
  static async records(email, limit, offset) {
    try {
      let recordQuery = `
            SELECT *
            FROM records
            WHERE email = $1
            ORDER BY id
      `;
      if (limit || offset) {
        const limiter = `
            LIMIT $2 OFFSET $3
      `;
        recordQuery = recordQuery + limiter;
      }

      const value = [email, limit, offset];

      let { rows: record } = await pool.query(recordQuery, value);

      return record;
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionModel;
