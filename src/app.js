const express = require("express");
const responseHelper = require("./helpers/response.helper").helper();
const db = require("./configs/db.config");
const Student = require("./models/student.model");
const routes = require("./routes");

const port = process.env.PORT || "3000";
const app = express();

app.use(responseHelper);
app.use("/api", routes);

const initApp = async (server, db) => {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");

    Student.sync({ alter: true });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

initApp(app, db);

module.exports = app;
