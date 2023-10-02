const express = require("express")
const app = express()
const PORT = 3000; 
const { default: mongoose, connect } = require("mongoose")
const dotenv = require('dotenv');
dotenv.config(); 

///Setting view engine 
app.set("view engine","ejs")
app.use(express.static(__dirname+'/assets'));

app.use(express.urlencoded({extended:false}))



try{

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
mongoose.connect(
    process.env.URI,
    {useNewUrlParser : true,
    useUnifiedTopology:true
    }
    )
.then(() => {
    console.log('Connected To MongoDB')///SUCESS MESSAGE
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`) ///SERVER RUNNING ON PORT
    })
}) 
.catch((err)=>{
    console.error(`Something went wrong : ${err} `)  ///Error handler
})
} catch (e){console.log(`${e}`)}

