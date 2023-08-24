"use strict";

var express = require('express');

var router = express.Router();

var User = require("../models/usersDB");

var bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("signup.ejs");
});
router.post("/", function _callee(req, res) {
  var hashedpassword, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 3:
          hashedpassword = _context.sent;
          /// Changing passowrd to encrypted one 
          req.body.password = hashedpassword; /// Sending object to database(mongoDB)

          user = new User(req.body);
          user.save().then(function (result) {
            console.log("NEW USER ADDED"); //// Success message

            res.redirect("../home"); /// 
          })["catch"](function (err) {
            console.log(err); /// Error handler

            res.redirect("../signup");
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); ///Error handler incase 

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router; /// Exporting router