const express = require("express");
const responseHelper = require("./helpers/response.helper").helper();

const http = require("http");
const routes = require("./routes");

const port = process.env.PORT || "3000";
const app = express();
const server = http.createServer(app);

app.use(responseHelper);
app.use("/api", routes);

server.listen(port);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

module.exports = app;
