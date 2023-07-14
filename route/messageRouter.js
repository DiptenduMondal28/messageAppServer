const express=require('express');
const router = express.Router();
const authentication=require('../middlewire/auth');
const controller = require('../controller/messageController');

//user message sent
router.post('/message',authentication.authenticate,controller.messageSent);

//get reply from other
router.get('/allreply',authentication.authenticate,controller.getreply);

//get last message
router.get('/lastmessage',authentication.authenticate,controller.lastMessage);

module.exports=router;