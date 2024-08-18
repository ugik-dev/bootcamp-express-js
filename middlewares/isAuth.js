const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (redirect = false) => {
  return async (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log("belum login");
      if (redirect) {
        req.flash("error_msg", "Belum Login!");
        return res.redirect("/login");
      } else return next(new ErrorHandler("Belum Login", 401));
    }
    next();
  };
};
