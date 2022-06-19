const express = require("express");
const testController = require("../controllers/v1/test.controller");
const studentController = require("../controllers/v1/student.controller");

const router = express.Router();

router.get("/", testController.getTest);

router.get("/students", studentController.getStudents);
router.get("/students/:id", studentController.getStudent);
router.post("/students", studentController.createStudent);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
