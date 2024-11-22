
import sequelize from "../../utils/connectMysqlDb.js";
import { DataTypes } from "sequelize";

const Hall = sequelize.define("Hall", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Hall;