const express=require('express');
const router = express.Router();
const authentication=require('../middlewire/auth');
const controller = require('../controller/messageController');

//user message sent
router.post('/message',authentication.authenticate,controller.messageSent);

module.exports=router;