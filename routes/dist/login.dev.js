"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcrypt");

var Sessions = require("../models/sessionsDB");

var session = require("express-session");

router.get("/", function (req, res) {
  res.render("login.ejs");
});
module.exports = router;