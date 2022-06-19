module.exports = async (schema, req, res) => {
  const validated = await schema
    .validateAsync(req.body, {
      abortEarly: false,
      request: req,
    })
    .catch((error) => {
      const { details } = error;
      const message = details.map((i) => {
        return {
          message: i.message,
          path: i.context.key,
        };
      });
      res.failValidationError({ error: message });
    });
  console.log(validated);
  return validated;
};
