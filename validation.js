import Joi from "joi";

export const createUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(4).required(),
    password: Joi.string()
      .min(4)
      .max(15)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(4)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

export const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4),
    email: Joi.string().min(4),
    password: Joi.string()
      .min(4)
      .max(15)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  });
  return schema.validate(data);
};
