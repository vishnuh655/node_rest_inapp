const Joi = require("joi");
const Student = require("../../models/student.model");
const schemaValidate = require("../../helpers/schema.helper");
const StudentSchema = require("../../schemas/student.schema");

module.exports = {
  createStudent: async (req, res) => {
    try {
      const validatedData = await schemaValidate(StudentSchema, req, res);
      const student = await Student.create(validatedData);
      res.send(student);
    } catch (err) {
      res.failServerError(err);
    }
  },

  getStudents: async (req, res) => {
    try {
      const students = await Student.findAll();
      res.send(students);
    } catch (err) {
      res.failServerError(err);
    }
  },

  updateStudent: async (req, res) => {
    try {
      const students = await Student.update(req.body);
      res.send(students);
    } catch (err) {
      res.failServerError(err);
    }
  },

  deleteStudent: async (req, res) => {},
};
