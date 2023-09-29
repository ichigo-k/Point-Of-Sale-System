"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  Productname: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
var Product = mongoose.model("Product", ProductSchema);
module["export"] = Product;