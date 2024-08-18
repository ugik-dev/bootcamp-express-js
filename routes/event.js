const express = require("express");
const People = require("../models/peoples");
const Events = require("../models/events");
const HelperFunction = require("../utils/HelperFunction");
const peoples = require("../models/peoples");
const eventController = require("../controllers/eventController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(eventController.get)
  .post(HelperFunction.wrapAsync(eventController.store));

router
  .route("/:event_id")
  .patch(HelperFunction.wrapAsync(eventController.update))
  .delete(HelperFunction.wrapAsync(eventController.delete));

module.exports = router;
