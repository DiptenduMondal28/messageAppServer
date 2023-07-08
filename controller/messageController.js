const { response } = require('express');
const Message=require('../module/message');
const message = require('../module/message');

module.exports.messageSent=async(req,res,next)=>{
    // console.log(req);
    await Message.create({
        message:req.body.message,
        userId:req.user.id
    })
};

module.exports.getreply=async(req,res,next)=>{
    await Message.findAll().then(message=>{
        // console.log(message);
        res.json({message:message});
    })
}