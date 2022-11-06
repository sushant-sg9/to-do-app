const express = require ("express");
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors');
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')
const port = 8080;

app.use(bodyParser.json());
app.use(cors())
app.use('/user' , userRoute)
app.use('/task', taskRoute);

mongoose.connect("mongodb://localhost:27017/appTodoList",(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("connected to db")
    }
})

app.listen(port,()=>{
    console.log(`app running on port ${port}`)  
})
module.exports=app;