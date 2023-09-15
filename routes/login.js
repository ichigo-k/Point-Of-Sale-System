const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Sessions = require("../models/sessionsDB")
const session = require("express-session");






router.get("/",(req,res)=>{
    res.render("login.ejs")
    
})


module.exports = router;