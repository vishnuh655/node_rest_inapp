const express = require("express");

const router = express.Router();

router.use("/v1", require("./api.v1.route"));

router.get("*", function (req, res) {
  res.failNotFound("Not Found");
});

module.exports = router;
