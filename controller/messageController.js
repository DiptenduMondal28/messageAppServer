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
        console.log('group id',req.query.group);
        console.log(typeof(req.query.Group))
        console.log('another req  query:',req.query)
        const totalMessage=await Message.count();
        await Message.findAll({
            where:{groupId:Number(req.query.group)},
            include:[User,Group],
        }).then((messages)=>{
            // console.log(messages);
            res.json({message:messages})
        })
    }catch(err){
        console.log(err);
    }
    
};

module.exports.lastMessage=async(req,res,next)=>{
    console.log('what is request',req.query);
    try{
        const groupId = parseInt(req.query.group);
        const lastMessage = await Message.findOne({
            where: {
                groupId: groupId
            },
            order: [['createdAt', 'DESC']],
            include:[User,Group]
        }).then(result=>{
            console.log(result)
            res.status(200).json(result);
        }).catch(err=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }


}

