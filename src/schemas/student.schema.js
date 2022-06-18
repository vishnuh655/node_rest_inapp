const Joi = require("joi");
const Student = require("../models/student.model");

const rollNumberLookup = async (rollNumber, prefs) => {
  console.log(prefs);
  const student = await Student.count({
    where: {
      roll_number: rollNumber,
    },
  });
  if (student >= 1) {
    throw new Joi.ValidationError("Student with roll number already exists", [
      {
        message: "Student with roll number already exists",
        path: ["roll_number"],
        context: {
          key: "roll_number",
          label: "roll_number",
        },
      },
    ]);
  }
};

module.exports = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().iso().max("now").required(),
  roll_number: Joi.number()
    .max(20000000)
    .min(1)
    .required()
    .external(rollNumberLookup),
});
