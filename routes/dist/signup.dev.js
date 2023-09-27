"use strict";

var express = require('express');

var router = express.Router();

var User = require("../models/usersDB");

var bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("signup.ejs");
});
router.post("/", function _callee(req, res) {
  var _req$body, username, email, existingUser, hashedpassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            $or: [{
              username: username
            }, {
              email: email
            }]
          }));

        case 4:
          existingUser = _context.sent;

          if (existingUser) {
            res.redirect("login?username and email alredy exists");
          } /// Securing password with bcrypt


          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 8:
          hashedpassword = _context.sent;
          /// Changing passowrd to encrypted one 
          req.body.password = hashedpassword;
          req.body.isloggedin = true; /// Sending object to database(mongoDB)

          user = new User(req.body);
          user.save().then(function (result) {
            console.log("NEW USER ADDED"); //// Success message

            res.redirect("../home"); /// 
          })["catch"](function (err) {
            console.log(err); /// Error handler

            res.redirect("../signup");
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); ///Error handler incase 

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
module.exports = router; /// Exporting router