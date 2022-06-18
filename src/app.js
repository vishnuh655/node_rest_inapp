const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./routes");
const db = require("./configs/db.config");
const responseHelper = require("./helpers/response.helper");
const serverConfig = require("./configs/server.config");
const Student = require("./models/student.model");

const app = express();

app.use(responseHelper.helper());
app.use("/api", routes);

const initApp = async (server, db) => {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");

    Student.sync({ alter: true });

    server.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

initApp(app, db);

module.exports = app;
