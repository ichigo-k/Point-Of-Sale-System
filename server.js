const express = require("express")
const { default: mongoose, connect } = require("mongoose")
const app = express()
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config(); 


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
    console.error(`Something went wrong ${err} `)  ///Error handler
})

