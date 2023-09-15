"use strict";

var express = require("express");

var app = express();
var PORT = 3000;

var _require = require("mongoose"),
    mongoose = _require["default"],
    connect = _require.connect;

var Session = require("./models/sessionsDB");

var session = require("express-session");

var dotenv = require('dotenv');

dotenv.config();

try {
  app.use(express.urlencoded({
    extended: false
  })); /// Authenticating user 

  app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  })); ///Setting view engine 

  app.set("view-engine", "ejs");
  app.use(express["static"](__dirname + '/assets')); //// SignUp routes

  var signupRoutes = require("./routes/signup");

  app.use("/signup", signupRoutes); //// Login routes

  var loginRoutes = require("./routes/login");

  app.use("/login", loginRoutes); //// Home routes

  var homeRoutes = require("./routes/home");

  app.use("/home", homeRoutes); ///Connect to mongodb Databse

  mongoose.connect(process.env.URI).then(function () {
    console.log('Connected To MongoDB'); ///SUCESS MESSAGE

    app.listen(PORT, function () {
      console.log("Server is running on port ".concat(PORT)); ///SERVER RUNNING ON PORT
    });
  })["catch"](function (err) {
    console.error("Something went wrong :"); ///Error handler

    console.error(err); ///Error handler
  });
} catch (error) {
  console.log("There is an error");
  console.log(error);
}