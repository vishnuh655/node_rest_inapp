const Student = require("../../models/student.model");

module.exports = {
  createStudent: async (req, res) => {
    try {
      const student = await Student.create({
        name: "Vishnu",
        dob: "2020-01-01",
        roll_number: 1,
      });
      res.send(student);
    } catch (err) {
      res.fail(err);
    }
  },

  getStudents: async (req, res) => {
    try {
      const students = await Student.findAll();
      res.send(students);
    } catch (err) {
      res.fail(err);
    }
  },
};
