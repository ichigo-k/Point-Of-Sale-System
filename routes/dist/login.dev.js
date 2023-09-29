"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require("bcrypt");

var users = require('../models/usersDB');

router.get("/", function (req, res) {
  res.render("login.ejs", {
    error: null,
    title: "Welcome back"
  });
});
router.post("/", function _callee(req, res, next) {
  var _req$body, username, email, existingUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email;
          _context.next = 3;
          return regeneratorRuntime.awrap(users.findOne({
            username: username
          }));

        case 3:
          existingUser = _context.sent;

          if (!existingUser) {
            res.render('login', {
              error: 'Sorry something went wrong, Please try again',
              title: "Welcome back"
            });
            ;
          } else {
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
                    res.render('login.ejs', {
                      error: 'Invalid username or password',
                      title: "Welcome back"
                    });
                  }
                }
              });
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;