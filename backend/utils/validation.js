const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("./consts");
const BadRequestError = require("../errors/BadRequestError");

const validation = {
  validateParams: celebrate({
    params: Joi.object().keys({
      userID: Joi.string().length(24).hex().required(),
    }),
    // .error(new BadRequestError("Ошибка в данных")),
  }),
  validateCard: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().custom(validateURL).required(),
    }),
  }),
  validateProfile: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  validateAvatar: celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL).required(),
    }),
  }),
  validateSignup: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  validateSignin: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
};

module.exports = validation;
