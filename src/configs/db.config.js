const path = require("path");
const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: path.join(
    __dirname,
    "../../",
    process.env.DB_PATH || "db/database.sqlite"
  ),
  logging: process.env.NODE_ENV === "dev" ? true : false,
});
