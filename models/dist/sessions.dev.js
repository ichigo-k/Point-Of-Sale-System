"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var SessionSchema = new Schema({
  sessions: {
    type: string
  }
});
var Session = mongoose.model("Session", SessionSchema);
module.exports = Session;