const path = require("path");
const { Sequelize } = require("sequelize");

const dbAbsolutePath = process.env.DB_PATH || "db/database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../", dbAbsolutePath),
  logging: false,
});

module.exports = sequelize;
