const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");


router.get("/",(req,res)=>{
    res.render("login.ejs")
})


module.exports = router;