const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    Productname:{
        type : String ,
        required: true
    },
    Price:{
        type : Number ,
        required : true
    },
    Quantity:{
        type : Number,
        required: true
    }
})


const Product = mongoose.model("Product",ProductSchema)

module.export = Product