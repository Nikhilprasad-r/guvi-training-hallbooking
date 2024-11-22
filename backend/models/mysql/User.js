

import { DataTypes } from "sequelize";
import sequelize from "../../utils/connectMysqlDb.js";

const User = sequelize.define("Users", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
date: {
      type: DataTypes.ENUM('User','Admin'),
      defaultValue: "User",
  },
});

export default User;