"use strict";

var User = require("./models/usersDB");

var bcrypt = require("bcrypt");

modules["export"](function userExists(email) {
  User.findOne({
    email: email
  }).then(function (user) {
    return user !== null;
  });
});