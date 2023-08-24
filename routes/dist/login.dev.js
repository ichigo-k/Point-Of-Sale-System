"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("login.ejs");
});
module.exports = router;