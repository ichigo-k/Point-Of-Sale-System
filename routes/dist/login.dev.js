"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcrypt");

var users = require('../models/usersDB');

router.get("/", function (req, res) {
  res.render("login.ejs");
});
router.post("/", function (req, res) {
  users.findOne({
    username: req.body.username
  }).then(function (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          res.redirect("home");
          req.body.isloggedin = true;
        } else {
          res.redirect("login?error=Sorry please try again");
        }
      }
    });
  });
});
module.exports = router;