const SeekerProfile = require("../models/SeekerProfile");
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { getCredentialFromToken } = require("../utils/Auth");
const {getDataUri,getExtensionName} = require("../utils/dataUri");
const { loadUserByUserName } = require("./authControler");
const cloudinary =require("cloudinary");


const createSeekerProfile=asyncErrorHandler (async (req,res)=>{

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
            resSeeker.url=cloudinaryPublicUrl.url;
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

})

module.exports={createSeekerProfile,updateSeekerProfile,uploadProfilePic,uploadResume}