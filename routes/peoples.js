const express = require("express");

const People = require("../models/peoples");
const isAuth = require("../middlewares/isAuth");
const PeopleController = require("../controllers/peoples");
const HelperFunction = require("../utils/HelperFunction");
const { validatePeople } = require("../middlewares/validator");
const upload = require("../config/multer");
const router = express.Router();
router
  .route("/")
  .get(isAuth(true), HelperFunction.wrapAsync(PeopleController.index))
  .post(
    // isAuth(),
    upload.array("image", 5),
    validatePeople,
    HelperFunction.wrapAsync(PeopleController.store)
  );
// .post(upload.array("image", 5), (req, res) => {
//   // console.log(req.files);
//   // console.log(req.body);
//   return res.send("sy");
// });
router.get("/edit/:id", HelperFunction.wrapAsync(PeopleController.viewEdit));

router.get(
  "/create",
  // isAuth(true),
  (req, res) => {
    res.render("peoples/form", { action: "create" });
  }
);

router.use("/events/:people_id", require("./event"));

router.patch(
  "/:id",
  upload.array("image", 5),
  HelperFunction.wrapAsync(PeopleController.update)
);

router.get(
  "/detail/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const people = await People.findById(id);
    // console.log(people);
    // res.send(people);
    res.render("peoples/detail", { people });
    //   res.send("its people");
  })
);

router.delete(
  "/:id",
  HelperFunction.wrapAsync(async (req, res) => {
    const { id } = req.params;
    const people = await People.findOneAndDelete({ _id: id });
    res.send({ message: "Delete success id:" + people._id });
  })
);

module.exports = router;
