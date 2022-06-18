const { Sequelize, DataTypes } = require("sequelize");
const db = require("../configs/db.config");

const Student = db.define(
  "students",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    roll_number: { type: DataTypes.INTEGER, unique: true },
  },
  {
    freezeTableName: true,
  }
);

const StudentSchema = {};

module.exports = Student;
