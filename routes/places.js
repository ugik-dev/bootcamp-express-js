const express = require("express");

const router = express.Router();
const Place = require("../models/places");

const { placeValidation } = require("../schemas/places");
const HelperFunction = require("../utils/HelperFunction");
const ErrorHandler = require("../utils/ErrorHandler");

const validatePlace = (req, res, next) => {
  const { error } = placeValidation.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    return next(new ErrorHandler(message, 400));
  } else {
    next();
  }
};

router.get(
  "/",
  HelperFunction.wrapAsync(async (req, res) => {
    const places = await Place.find({});
    res.render("places", { places });
  })
);
router.get(
  "/edit/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const place = await Place.findById(req.params.id);
    res.render("places/form", { place, action: "edit" });
    // res.render("places", { places });
  })
);
router.get("/create", (req, res) => {
  res.render("places/form", { action: "create" });
});

router.post(
  "/",
  validatePlace,
  HelperFunction.wrapAsync(async (req, res) => {
    const place = new Place(req.body);
    await place.save();
    res.send({ message: "Data berhasil ditambah dengan id :" + place._id });
    //   res.render("places/form", { action: "create" });
  })
);

router.patch(
  "/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const id = req.params.id;
    const product = await Place.findOneAndUpdate(
      { _id: id },
      { ...req.body.people },
      {
        runValidators: true,
      }
    );
    // const product = await Product.findOne({ _id: product_id, owner: owner_id });
    res.send({ message: "edit success id:" + product._id });
  })
);
router.get(
  "/detail/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const place = await Place.findById(id);
    res.render("places/detail", { place });
  })
);

router.delete(
  "/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findOneAndDelete({ _id: id });
    res.send({ message: "Delete success id:" + place._id });
  })
);

module.exports = router;
