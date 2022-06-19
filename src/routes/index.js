const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("../docs/swagger.specs");

const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
router.use("/v1", require("./api.v1.route"));

router.get("*", function (req, res) {
  res.failNotFound("Not Found");
});

module.exports = router;
