const express = require("express")
const app = express()
const PORT = 3000; 
const { default: mongoose, connect } = require("mongoose")
const user = require("./models/usersDB")
const product = require("./models/ProductsDB")
const dotenv = require('dotenv');
dotenv.config(); 



app.use(express.urlencoded({extended:false}))

///Setting view engine 
app.set("view-engine","ejs")
app.use(express.static(__dirname + '/assets'));



//// SignUp routes
const signupRoutes = require("./routes/signup")
app.use("/signup",checkNotauth,signupRoutes)


//// Login routes
const loginRoutes = require("./routes/login")
app.use("/login",checkNotauth,loginRoutes)


//// Home routes
const homeRoutes = require("./routes/home");
app.use("/home",checkAuth,homeRoutes)



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

