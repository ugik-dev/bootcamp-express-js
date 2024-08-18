const Joi = require("joi");

// module.exports.peopleValidation = Joi.object({
//   name: Joi.string().required().min(5),
//   nik: Joi.string().required(),
//   dob: Joi.date().required(),
//   address: Joi.string().min(0).required(),
//   parent_name: Joi.string(),
//   // image: Joi.string().required(),
// });

module.exports.peopleValidation = Joi.object({
  people: Joi.object({
    name: Joi.string().required().min(5),
    nik: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.string().min(0).required(),
    parent_name: Joi.string(),
    // image: Joi.string().required(),
  }).required(),
});
