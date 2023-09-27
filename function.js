const User = require("./models/usersDB")
const bcrypt = require("bcrypt")

modules.export (
    function userExists(email){
        User.findOne({email:email})
        .then ((user)=>{
            return user !==  null
        })
    
    }
)