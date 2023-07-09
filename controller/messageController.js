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
    try{
        console.log(req.query.start);
        let start = req.query.start;
        let offSet = 0;
        if(!start){
            offSet = 1;
        }else{
            offSet = Number(start);
        }
        console.log('offset',offSet)
        await Message.findAll({
            offset:offSet,
            include:[User]
        }).then((messages)=>{
            res.json({message:messages})
        })
    }catch(err){
        console.log(err);
    }
    
}