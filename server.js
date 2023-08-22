/// VARIABLES FOR SERVER
const express = require("express")
const app = express()
const PORT = 3000;

///VARIABLES FOR DATABASE 
const { default: mongoose, connect } = require("mongoose")
const user = require("./models/usersDB")

////VARIABLES FOR DOTENV 
const dotenv = require('dotenv');
dotenv.config(); 

//// SignUp routes
const signupRoute = require("./routes/signup")

///Setting view engine 
app.set("view-engine","ejs")
app.use(express.static(__dirname + '/assets'));


///Connect to mongodb Databse
mongoose.connect(process.env.URI)
.then(() => {
    console.log('Connected To MongoDB')///SUCESS MESSAGE
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`) ///SERVER RUNNING ON PORT
    })
}) 
.catch((err)=>{
    console.error(`Something went wrong : ${err} `)  ///Error handler
})

