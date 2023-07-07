const Message=require('../module/message');

module.exports.messageSent=async(req,res,next)=>{
    // console.log(req);
    await Message.create({
        message:req.body.message,
        userId:req.user.id
    })
}