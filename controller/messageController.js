const Message=require('../module/message');
const message = require('../module/message');
const { where } = require('sequelize');
const User=require('../module/signup')

module.exports.messageSent=async(req,res,next)=>{
    // console.log(req);
    await Message.create({
        message:req.body.message,
        userId:req.user.id
    })
};

module.exports.getreply=async(req,res,next)=>{
    //console.log(req.params)
    await Message.findAll({include:[User]}).then((messages)=>{
        res.json({message:messages})
    })
}