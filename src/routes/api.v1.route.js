const express = require("express");
const schemaValidate = require("../middlewares/schema.middleware");
const testController = require("../controllers/v1/test.controller");
const studentController = require("../controllers/v1/student.controller");
const studentSchema = require("../schemas/student.schema");

const router = express.Router();

router.get("/", testController.getTest);

router.get("/students", studentController.getStudents);
router.post("/students", studentController.createStudent);
router.put("/students/{id}", studentController.updateStudent);
router.delete("/students/{id}", studentController.deleteStudent);

module.exports = router;
