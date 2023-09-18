const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/usersDB');




router.get("/",(req,res)=>{
    res.render("login.ejs")
    
})

router.post("/", (req,res)=>{
    users.findOne({username:req.body.username})
    .then((user)=>{
       bcrypt.compare(req.body.password, user.password, (err, result)=>{
        if (err){
            console.log(err)
        }else{
            if (result){
              res.redirect("home")
              req.body.isloggedin = true
            }else{
                res.redirect("login?error=Sorry please try again")
            }
        }
       })
    })
    
})


module.exports = router;