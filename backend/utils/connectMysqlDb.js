import mysql2 from "mysql2/promise";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "hallbooking",
  "root",
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    logging: console.log,
  }
);
export default sequelize;

export const connectMysqlDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully.");

    // Synchronize models
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

// const sequelize = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: "hallbooking",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default sequelize
