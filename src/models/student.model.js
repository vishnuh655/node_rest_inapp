const { DataTypes } = require("sequelize");
const db = require("../configs/db.config");

const Student = db.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    roll_number: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Student;
