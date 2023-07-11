const Message=require('../module/message');
const { where } = require('sequelize');
const User=require('../module/signup')
const Group=require('../module/group')
module.exports.messageSent=async(req,res,next)=>{
    console.log('user message sent',req.body);
    console.log(req.user.id)
    await Message.create({
        message:req.body.message,
        userId:req.user.id,
        groupId:req.body.groupid
    }).then(result=>{
        console.log(result);
    })
};

module.exports.getreply=async(req,res,next)=>{
    try{
        // console.log(req.query.start);
        // console.log(req);
        let start = req.query.start;
        let offSet = 0;
        if(!start){
            offSet = 1;
        }else{
            offSet = Number(start);
        }
        // console.log('offset',offSet)
        console.log('group name:',req.query.group);
        console.log(typeof(req.query.Group))
        await Message.findAll({
            where:{groupId:Number(req.query.group)},
            // offset:offSet,
            include:[User,Group]
        }).then((messages)=>{
            res.json({message:messages})
        })
    }catch(err){
        console.log(err);
    }
    
}