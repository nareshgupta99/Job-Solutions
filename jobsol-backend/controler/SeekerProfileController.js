const SeekerProfile = require("../models/SeekerProfile");
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { getCredentialFromToken } = require("../utils/Auth");
const {getDataUri,getExtensionName} = require("../utils/dataUri");
const { loadUserByUserName } = require("./authControler");
const cloudinary =require("cloudinary");


const createSeekerProfile=asyncErrorHandler (async (req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const data=req.body;
    const savedSeeker=await SeekerProfile.create(data);
    savedSeeker.setUser(candidate);
    res.status(200).send({
        message: "profile updated succeessfully",
        success:true
    })
})

const updateSeekerProfile=asyncErrorHandler (async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const seekerProfile=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
    seekerProfile={...seekerProfile,data}
    seekerProfile.save();
    const data = req.body;
     res.status(200).send({
        message: "profile updated succeessfully"
    })
})

const uploadProfilePic=asyncErrorHandler(async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
        const resSeeker=await SeekerProfile.findOne({where:{
            UserID:candidate.userId
        }})
    try {
        // Get the file 
        const file = req.file;
        const fileUri=getDataUri(file);
        
        const cloudinaryPublicUrl=await cloudinary.v2.uploader.upload(fileUri.content);
        if(resSeeker){
            if(resSeeker.imageUrl)
            resSeeker.imageUrl=cloudinaryPublicUrl.url;
            resSeeker.imagePublicId=cloudinaryPublicUrl.public_id;
            await resSeeker.save();
        }else{
           const savedSekker= await SeekerProfile.create({url:cloudinaryPublicUrl.url})
           savedSekker.setUser(candidate);
           savedSekker.save();
        }

        // Respond with the Cloudinary URL
        res.json({ url: cloudinaryPublicUrl.url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }

})

const uploadResume=asyncErrorHandler(async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const resSeeker=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
    const file = req.file;
    const fileUri=getDataUri(file);
    
    const cloudinaryPublicUrl=await cloudinary.v2.uploader.upload(fileUri.content);
    console.log(cloudinaryPublicUrl)
    if(resSeeker){
       
        if(resSeeker?.resumeUrl){
            result = await cloudinary.v2.uploader.destroy(resSeeker.imagePublicId); 
        }
        resSeeker.resumeUrl=cloudinaryPublicUrl.url;
        resSeeker.resumePublicId=cloudinaryPublicUrl.public_id;
        await resSeeker.save();
    }else{
       const savedSekker= await SeekerProfile.create({url:cloudinaryPublicUrl.url})
       savedSekker.setUser(candidate);
       savedSekker.resumeUrl=cloudinaryPublicUrl.url;
       savedSekker.resumePublicId=cloudinaryPublicUrl.public_id;
      await savedSekker.save();
    }
    res.status(200).json({
        resumeUrl:cloudinaryPublicUrl.url,
        message:"resume uploaded",
        success:true
    })

})

const deleteResume=asyncErrorHandler(async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const resSeeker=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
    result =await cloudinary.v2.uploader.destroy(resSeeker.resumePublicId);
    resSeeker.resumePublicId="";
    resSeeker.resumeUrl="";
   await resSeeker.save();
   res.status(200).json({
    message:"succefully deleted",
    success:true
   })
})

module.exports={createSeekerProfile,updateSeekerProfile,uploadProfilePic,uploadResume,deleteResume}