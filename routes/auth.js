const express = require("express");
const HelperFunction = require("../utils/HelperFunction");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
// const bcrypt = require("bcrypt");
const User = require("../models/users");
const passport = require("passport");
const isAuth = require("../middlewares/isAuthOld");

router.post(
  "/register",
  HelperFunction.wrapAsync(async (req, res) => {
    console.log("regis");
    // const hash = bcrypt.hashSync(req.body.password, 10);
    // req.body.password = hash;
    const { password } = req.body;
    const user = new User(req.body);

    const resUser = await User.register(user, password);
    req.login(resUser, (err) => {
      if (err) return next(err);
      res.send({ message: "registration and loggin success" });
    });
    // res.send({ message: "registration success" });
  })
);

router.post(
  "/logout",
  //  isAuth,
  (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "Logout berhasil");
      res.redirect("/login");
    });

    // req.session.destroy(() => {
    //   res.redirect("/login");
    // });
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: {
      message: "ini error",
    },
  }),
  (req, res) => {
    res.send({ message: "Login berhasil!" });
  }
  // HelperFunction.wrapAsync(async (req, res) => {
  //   const { username, password } = req.body;
  //   const user = await User.findByCredential(username, password);
  //   if (user) {
  //     req.session.user_id = user._id;
  //     return res.send({ message: "Login Success !!" });
  //   } else {
  //     throw new ErrorHandler("Data tidak ditemukan atau password salah!!");
  //   }
  //   throw new ErrorHandler("Terjadi kesalahan!!");
  // })
);
module.exports = router;
