const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("belum login");
    return next(new ErrorHandler("Belum Login", 401));
  }
  next();
};
