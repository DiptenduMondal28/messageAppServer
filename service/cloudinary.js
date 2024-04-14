const cloudinary=require('cloudinary').v2;
const { rejects } = require('assert');
const { error } = require('console');
const { resolve } = require('path');
const {Readable}=require('stream');
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.CLOUDAPIKEY,
    api_secret:process.env.CLOUDAPISECREAT
})

function uploadtoCloudnary(bufferFile,name){
    return new Promise((resolve,rejects)=>{
        const cloudStream=cloudinary.uploader.upload_stream(
            {
                folder:"messageappfile",
                resource_type: 'auto',
                public_id:name
            },
            (error,result)=>{
                if(error){
                    rejects(error)
                }else{
                    resolve(result)
                }
            }
        );
        const bufferStream=Buffer.from(bufferFile,'utf8');
        const readable_stream=Readable.from([bufferStream]);
        readable_stream.pipe(cloudStream)
    })
}

module.exports={uploadtoCloudnary}