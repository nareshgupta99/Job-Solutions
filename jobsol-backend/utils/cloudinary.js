const cloudinary = require('cloudinary').v2;
const FileUploadError=require("../Exception/FileUploadError");
const fs=require("fs");

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary=async (localPath)=>{
    try{

        if(!localPath){
            throw new FileUploadError("something wrong while uploading file")
        }
       const response=await cloudinary.uploader.upload(localPath,{
            resource_type:'auto',
        });
        const url=response.url();
        console.log("uploaded successfully"+url);
        return url;
    }catch(err){
        fs.unlinkSync(localPath).then(()=>{
            console.log(err)   
        }).catch((er)=>{
            console.log(er)   
        })
             
    }
}


module.exports=uploadOnCloudinary;