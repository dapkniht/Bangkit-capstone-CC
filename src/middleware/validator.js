const Joi = require("joi");

const validator = {};

validator.register = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      .messages({
        "string.pattern.base":
          "Passwords must have at least one uppercase letter and one number",
      })
      .required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

validator.login = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

validator.addAdmin = (req, res, next) => {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      .messages({
        "string.pattern.base":
          "Passwords must have at least one uppercase letter and one number",
      })
      .required(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

validator.editAdmin = (req, res, next) => {
  const { name, email, password } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().email(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      .messages({
        "string.pattern.base":
          "Passwords must have at least one uppercase letter and one number",
      }),
  }).or("name", "email", "password");
  const { error } = schema.validate({ name, email, password });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

validator.addFruit = (req, res, next) => {
  const { name, description, image } = req.body;
  console.log(req.body);
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
  });
  const { error } = schema.validate({ name, description, image });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = validator;
