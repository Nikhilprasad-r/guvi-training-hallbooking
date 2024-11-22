

import { DataTypes } from "sequelize";
import Hall from "./Hall.js";
import sequelize from "../../utils/connectMysqlDb.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    foreignKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Hall.hasMany(Booking, { foreignKey: "hallId" });
Booking.belongsTo(Hall, { foreignKey: "hallId" });

export default Booking;
