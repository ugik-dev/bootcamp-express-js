const { peopleValidation } = require("../schemas/peoples");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports.validatePeople = (req, res, next) => {
  const { error } = peopleValidation.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    return next(new ErrorHandler(message, 400));
  } else {
    next();
  }
};
