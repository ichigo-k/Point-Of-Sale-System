const { text } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema


const SessionSchema = new Schema({
     session:{
        type : Object,
        required:true
     }
})

const Session = mongoose.model("Session",SessionSchema)

module.exports = Session