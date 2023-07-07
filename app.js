//core module import
const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const fs=require('fs')
require('dotenv').config();

//database import
const sequalize=require('./util/database')



//module imort function
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:'http://127.0.0.1:5500', //origin not found in my pc
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}));
app.use(express.json());

//file import
const signupRouter=require('./route/signupRouter');
const loginRouter=require('./route/loginRoute');


app.use("/signup",signupRouter);
app.use(loginRouter);


sequalize.sync().then(()=>{
    console.log('sync');
    app.listen(3000);
}).catch((err)=>console.log(err));