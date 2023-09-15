const express = require("express")
const app = express()
const PORT = 3000; 
const { default: mongoose, connect } = require("mongoose")
const Session = require("./models/sessionsDB")
const session = require("express-session")
const dotenv = require('dotenv');
dotenv.config(); 



try{
    app.use(express.urlencoded({extended:false}))

/// Authenticating user 
app.use(session({
    secret: process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false,

}))

///Setting view engine 
app.set("view-engine","ejs")
app.use(express.static(__dirname + '/assets'));



//// SignUp routes
const signupRoutes = require("./routes/signup")
app.use("/signup",signupRoutes)



//// Login routes
const loginRoutes = require("./routes/login")
app.use("/login",loginRoutes)


//// Home routes
const homeRoutes = require("./routes/home");
app.use("/home",homeRoutes)


///Connect to mongodb Databse
mongoose.connect(process.env.URI)
.then(() => {
    console.log('Connected To MongoDB')///SUCESS MESSAGE
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`) ///SERVER RUNNING ON PORT
    })
}) 
.catch((err)=>{
    console.error(`Something went wrong :`)  ///Error handler
    console.error(err)  ///Error handler
})

}

catch(error){
    console.log("There is an error")
    console.log(error)
}

