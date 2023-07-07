const express=require('express');
const router=express.Router();

const controller=require('../controller/signup');

router.post('/createuser',controller.dataCreate);

module.exports=router;