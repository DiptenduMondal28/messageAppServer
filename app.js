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
    origin:'*', //origin not found in my pc
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}));
app.use(express.json());

//router import
const signupRouter=require('./route/signupRouter');
const loginRouter=require('./route/loginRoute');
const messageRouter=require('./route/messageRouter');

//module import
const User=require('./module/signup');
const Message=require('./module/message');


app.use("/signup",signupRouter);
app.use(loginRouter);
app.use('/user',messageRouter);

User.hasMany(Message);
Message.belongsTo(User);

sequalize.sync().then(()=>{
    console.log('sync');
    app.listen(3000);
}).catch((err)=>console.log(err));