const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    console.log(parseBody);
    req.body = parseBody;
  } catch (err) {
    res.status(400).json({ message: err.errors[0].message });
  }
};

module.exports = validate;
