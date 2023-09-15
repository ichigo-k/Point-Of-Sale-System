"use strict";

var _require = require("express"),
    text = _require.text;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var SessionSchema = new Schema({
  session: {
    type: Object,
    required: true
  }
});
var Session = mongoose.model("Session", SessionSchema);
module.exports = Session;