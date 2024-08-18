const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (redirectUrl) => {
  return async (req, res, next) => {
    console.log("isObjectValidID");

    const paramID = ["id", "people_id", "event_id"].find(
      (param) => req.params[param]
    );

    if (!paramID) {
      return next();
    }

    const id = req.params[paramID];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("isObjectValidID");
      return next(new ErrorHandler("Invalid ID / Data tidak temukan", 400));
    }

    next();
  };
};
