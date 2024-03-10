const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    // console.log(parseBody);
    req.body = parseBody;
  } catch (err) {
    const status = 400;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    const error = {
      status,
      message,
      extraDetails,
    };
    // res.status(400).json({ message: });
    next(error);
  }
};

module.exports = validate;
