"use strict";

var express = require("express");

var app = express();
var PORT = 3000;

var _require = require("mongoose"),
    mongoose = _require["default"],
    connect = _require.connect;

var user = require("./models/usersDB");

var product = require("./models/ProductsDB");

var dotenv = require('dotenv');

dotenv.config();
app.use(express.urlencoded({
  extended: false
})); ///Setting view engine 

app.set("view-engine", "ejs");
app.use(express["static"](__dirname + '/assets')); //// SignUp routes

var signupRoutes = require("./routes/signup");

app.use("/signup", checkNotauth, signupRoutes); //// Login routes

var loginRoutes = require("./routes/login");

app.use("/login", checkNotauth, loginRoutes); //// Home routes

var homeRoutes = require("./routes/home");

app.use("/home", checkAuth, homeRoutes); ///Connect to mongodb Databse

mongoose.connect(process.env.URI).then(function () {
  console.log('Connected To MongoDB'); ///SUCESS MESSAGE

  app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT)); ///SERVER RUNNING ON PORT
  });
})["catch"](function (err) {
  console.error("Something went wrong : ".concat(err, " ")); ///Error handler
});