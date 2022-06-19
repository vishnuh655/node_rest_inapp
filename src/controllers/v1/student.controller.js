const Student = require("../../models/student.model");
const schemaValidate = require("../../helpers/schema.helper");
const StudentSchema = require("../../schemas/student.schema");

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Student operations
 */

/**
 * @swagger
 * definitions:
 *  Student:
 *   type: object
 *   required: [name, roll_number, dob]
 *   properties:
 *    name:
 *      type: string
 *      example: "John Doe"
 *    roll_number:
 *      type: number
 *      example: 12345
 *    dob:
 *      type: string
 *      example: "2020-01-01"
 */
module.exports = {
  /**
   * @swagger
   * /v1/students:
   *  post:
   *    tags:
   *      - Student
   *    summary: Create a new student
   *    description: Create a new student
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/definitions/Student'
   *    responses:
   *      201:
   *        description: A successful response
   */
  createStudent: async (req, res) => {
    try {
      const validatedData = await schemaValidate(StudentSchema, req, res);
      if (validatedData) {
        const student = await Student.create(validatedData);
        res.respondCreated(student, "Student created successfully");
      }
    } catch (err) {
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/students:
   *  get:
   *   tags:
   *      - Student
   *   summary: Get all students
   *   description: Get all students
   *   responses:
   *     200:
   *       description: A successful response
   */
  getStudents: async (req, res) => {
    try {
      const students = await Student.findAll({
        order: [["roll_number", "ASC"]],
      });
      res.send(students);
    } catch (err) {
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/students/{id}:
   *  get:
   *    tags:
   *      - Student
   *    description: Get a student by id
   *    summary: Get a student by id
   *    parameters:
   *      - in: path
   *        name: id
   *        description: Student id
   *        required: true
   *        schema:
   *          type: string
   *          example: "8e945726-b23c-4d3c-86b8-8d3a9e94a68f"
   *    responses:
   *      200:
   *        description: A successful response
   */
  getStudent: async (req, res) => {
    try {
      const student = await Student.findByPk(req.params.id);
      if (student) {
        res.send(student);
      } else {
        res.failNotFound("Student not found");
      }
    } catch (err) {
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/students/{id}:
   *  put:
   *    tags:
   *      - Student
   *    description: Update a student
   *    summary: Update a student
   *    parameters:
   *      - in: path
   *        name: id
   *        description: Student id
   *        required: true
   *        schema:
   *          type: string
   *          example: "8e945726-b23c-4d3c-86b8-8d3a9e94a68f"
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/definitions/Student'
   *    responses:
   *      200:
   *        description: A successful response
   */
  updateStudent: async (req, res) => {
    try {
      const validatedData = await schemaValidate(StudentSchema, req, res);
      const updatedStudent = await Student.update(validatedData, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedStudent && updatedStudent[0] === 1) {
        res.respondUpdated(true, "Student updated successfully");
      } else {
        res.failNotFound("Student not found");
      }
    } catch (err) {
      res.failServerError(err);
    }
  },

  /**
   * @swagger
   * /v1/students/{id}:
   *  delete:
   *    tags:
   *      - Student
   *    description: Delete a student
   *    summary: Delete a student
   *    parameters:
   *      - in: path
   *        name: id
   *        description: Student id
   *        required: true
   *        schema:
   *          type: string
   *          example: "8e945726-b23c-4d3c-86b8-8d3a9e94a68f"
   *    responses:
   *      200:
   *        description: A successful response
   */
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
