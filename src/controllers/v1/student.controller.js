const Student = require("../../models/student.model");
const schemaValidate = require("../../helpers/schema.helper");
const StudentSchema = require("../../schemas/student.schema");

module.exports = {
  createStudent: async (req, res) => {
    try {
      const validatedData = await schemaValidate(StudentSchema, req, res);
      const student = await Student.create(validatedData);
      res.respondCreated(student, "Student created successfully");
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
      const validatedData = await schemaValidate(StudentSchema, req, res);
      const updatedStudent = await Student.update(validatedData, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedStudent && updatedStudent[0] === 1) {
        res.respondUpdated(updatedStudent, "Student updated successfully");
      } else {
        res.failNotFound("Student not found");
      }
    } catch (err) {
      res.failServerError(err);
    }
  },

  deleteStudent: async (req, res) => {
    try {
      if (
        await Student.destroy({
          where: {
            id: req.params.id,
          },
        })
      ) {
        res.respondDeleted(true, "Student deleted successfully");
      } else {
        res.failNotFound("Student not found");
      }
    } catch (err) {
      res.failServerError(err);
    }
  },
};
