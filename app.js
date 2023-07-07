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
app.use(cors());
app.use(express.json());

//file import
const signupRouter=require('./route/signup')


app.use("/signup",signupRouter);


sequalize.sync().then(()=>{
    console.log('sync');
    app.listen(3000);
}).catch((err)=>console.log(err));