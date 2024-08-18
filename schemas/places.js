const Joi = require("joi");

module.exports.placeValidation = Joi.object({
  title: Joi.string().required().min(5),
  location: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().required(),
  // eventsPeople : [{
  //   type :
  // }]
});
