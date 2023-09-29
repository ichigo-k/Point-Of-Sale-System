const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require('../models/usersDB');



router.get("/",(req,res)=>{
    res.render("login.ejs",{error:null,title:"Welcome back"})
    
})

router.post("/" , async (req,res,next)=>{
    
    const {username, email} = req.body
    const existingUser = await users.findOne({username });
    if(!existingUser){
        res.render('login', { error: 'Sorry something went wrong, Please try again',title:"Welcome back" });;
        
    }else{
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
                res.render('login.ejs', { error: 'Invalid username or password',title:"Welcome back" });
            }
        }
       })
    })
    }
    
    
})


module.exports = router;