/// VARIABLES FOR SERVER
const express = require("express")
const app = express()
const PORT = 3000;

///VARIABLES FOR DATABASE 
const { default: mongoose, connect } = require("mongoose")
const user = require("./models/usersDB")
const product = require("./models/ProductsDB")

////VARIABLES FOR DOTENV 
const dotenv = require('dotenv');
dotenv.config(); 

app.use(express.urlencoded({extended:false}))

///Setting view engine 
app.set("view-engine","ejs")
app.use(express.static(__dirname + '/assets'));





//// SignUp routes
const signupRoutes = require("./routes/signup")
app.use("/signup",signupRoutes)


//// Login routes
const loginRoutes = require("./routes/login")
app.use("/login",loginRoutes)


app.get("/home",(req,res)=>{
    res.render("home.ejs");
})



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

