const express = require("express");
const testController = require("../controllers/v1/test.controller");
const studentController = require("../controllers/v1/student.controller");

const router = express.Router();

router.get("/", testController.getTest);

router.post("/students", studentController.createStudent);
router.get("/students", studentController.getStudents);

module.exports = router;
