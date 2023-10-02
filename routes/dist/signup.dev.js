"use strict";

var express = require('express');

var router = express.Router();

var User = require("../models/usersDB");

var bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("signup.ejs", {
    title: "Join the community",
    error: null
  });
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

          if (!existingUser) {
            _context.next = 9;
            break;
          }

          res.render("signup", {
            error: "An account with the username already exists",
            title: "Join the community"
          });
          _context.next = 16;
          break;

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 11:
          hashedpassword = _context.sent;
          /// Changing passowrd to encrypted one 
          req.body.password = hashedpassword;
          req.body.isloggedin = true; /// Sending object to database(mongoDB)

          user = new User(req.body);
          user.save().then(function (result) {
            console.log("NEW USER ADDED"); //// Success message

            console.log(req.body);
            res.redirect("../home"); /// 
          })["catch"](function (err) {
            console.log(err); /// Error handler

            res.redirect("../signup");
          });

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); ///Error handler incase 

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
module.exports = router; /// Exporting router