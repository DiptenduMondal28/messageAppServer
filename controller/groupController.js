const { response } = require('express');
const Group=require('../module/group');
const userGroup = require('../module/userGroup');
const message = require('../module/message');

module.exports.groupCreate=async (req,res,next)=>{
    try{
        console.log("creater",req.user.id,req.user.name,req.user.email);// user id name email
        console.log('req parems',req.body.name) //group name

        await Group.create({
            name:req.body.name,
            admin:req.user.id
        }).then(async(response)=>{
            // console.log(response);
            await userGroup.create({
                userId:response.admin,
                groupId:response.id
            })
        }).catch(err=>{
            console.log(err);
        })
    }catch(err){
        console.log(err);
    }
     
}

module.exports.userInGroup=async(req,res,next)=>{
    try{
        // console.log(req.user.id);
        const userAllGroup=await userGroup.findAll({  //in those group user present maybe as admin or not
            where:{
                userId:req.user.id
            }
        })
        console.log(userAllGroup);
        
        const data=[];
        for(let i=0;i<userAllGroup.length;i++){
            const group=await Group.findByPk(userAllGroup[i].groupId);
            data.push(group);
        }

        res.status(200).json(data)
    }catch(err){
        console.log(err);
    }

}

module.exports.adduser=async(req,res,next)=>{
    try{
        console.log('req params',req.body.userid);
        console.log('req query',req.query.groupid);
        const ispresent=await userGroup.findOne({where:{userId:req.body.userid,groupId:req.query.groupid}})
        console.log(ispresent);
        if(!ispresent){
            await userGroup.create({userId:req.body.userid,groupId:req.query.groupid}).then(response=>{
                res.status(200).json({message:'user add in this group'});
            }).catch(err=>{
                console.log(err);
            })
        }else{
            return res.status(409).json({message:'user already exist in this group'});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'user not exixt'})
    }

}