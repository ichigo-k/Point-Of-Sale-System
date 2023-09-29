"use strict";

var express = require("express");

var router = express.Router();
router.get("/", function (req, res) {
  res.render("home.ejs", {
    title: "Start exploring here"
  });
});
module.exports = router;