const Joi = require("joi");

module.exports = (schema, $property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, schema);
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.failValidationError({ error: message });
    } else {
      next();
    }
  };
};
