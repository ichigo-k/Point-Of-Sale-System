const express = require('express');
const router = express.Router();
const User = require("../models/usersDB")
const bcrypt = require("bcrypt")


router.get("/",(req,res)=>{
    res.render("signup.ejs",{title:"Join the community",error:null})
})

router.post("/",async (req,res)=>{
    try {
        const {username, email} = req.body
        const existingUser = await User.findOne({ $or: [{username }, {email }] });
        if (existingUser){
            res.render("signup",{error:"An account with the username already exists", title:"Join the community"})
        }else{
             /// Securing password with bcrypt
        const hashedpassword = await bcrypt.hash(req.body.password,10)

        /// Changing passowrd to encrypted one 
        req.body.password = hashedpassword
        req.body.isloggedin = true

        /// Sending object to database(mongoDB)
        const user = new User(req.body)
        user.save()
        .then((result)=>{
            console.log("NEW USER ADDED")  //// Success message
            console.log(req.body)
            res.redirect("../home")  /// 
        })
        .catch((err)=>{
            console.log(err) /// Error handler
            res.redirect("../signup")
        })
    } 
            
        }
       
    catch (error) {
        console.log(error)  ///Error handler incase 
    }

})

module.exports = router;  /// Exporting router 
