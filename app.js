const express = require("express");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const localStrategy = require("passport-local");
const User = require("./models/users");
const app = express();
const port = 3000;
const appKey = "ugikDEV";
mongoose
  .connect("mongodb://127.0.0.1/studikasus")
  .then((result) => {
    console.log("Database MongoDB has running");
  })
  .catch((err) => {
    console.log("Something error :", err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: appKey,
    resave: false,
    // saveUninitialized: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // untuk keperluan Cross
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // sama seperti 7 hari
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.base_url = `http://localhost:${port}`;
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  req.session.token = "initoken";
  next();
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});

// app.use("/people/events", require("./routes/event"));
app.use("/place", require("./routes/places"));
app.use("/people", require("./routes/peoples"));
app.use("/auth", require("./routes/auth"));
app.get("/", (req, res) => {
  res.render("home");
});
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.status = 400;
    let message = "";
    Object.values(err.errors).map((item) => {
      message = message + " | " + item.message;
    });
    err.message = message;
  } else if (err.name === "CastError") {
    err.status = 404;
    err.message = "Maaf, data tidak ditemukan!";
  }
  next(err);
  // res.status(status).send(message);
});

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = "Oh No, Something Went Wrong !!. Please Contact Administrator",
  } = err;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});
