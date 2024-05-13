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
    let seekerProfile=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
    if(!seekerProfile){
        const savedSeeker=await SeekerProfile.create(data);
        savedSeeker.setUser(candidate);
        savedSeeker.save();
    }
    else{
        const data = req.body;
        console.log(data,"data")
        seekerProfile.name=data.name;
    seekerProfile.dob=data.dob;
    seekerProfile.contactNumber=data.contactNumber;
    seekerProfile.about=data.about;
    seekerProfile.currentLocation=data.currentLocation;
    seekerProfile.expectedSallery=data.expectedSallery;
    seekerProfile.save()
    }
    res.status(200).json({
        message: "profile updated succeessfully",
        success:true
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
        console.log(cloudinaryPublicUrl.url,"image url")
        if(resSeeker){
            if(resSeeker.imageUrl){
                await cloudinary.v2.uploader.destroy(resSeeker.imagePublicId);
            }
            resSeeker.imageUrl=cloudinaryPublicUrl.url;
            resSeeker.imagePublicId=cloudinaryPublicUrl.public_id;
            await resSeeker.save();
        }else{
            let profile={};
            profile.imageUrl=cloudinaryPublicUrl.url;
            profile.imagePublicId=cloudinaryPublicUrl.public_id;
           const savedSekker= await SeekerProfile.create(profile)
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
    console.log(file,"file")
    const fileUri=getDataUri(file);
    
    const cloudinaryPublicUrl=await cloudinary.v2.uploader.upload(fileUri.content,{resource_type:'raw'});
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

const deleteProfilePic=asyncErrorHandler(async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const resSeeker=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
    result =await cloudinary.v2.uploader.destroy(resSeeker.imagePublicId);
    resSeeker.imagePublicId="";
    resSeeker.imageUrl="";
   await resSeeker.save();
   res.status(200).json({
    message:"succefully deleted",
    success:true
   })
})

const getSeekerProfile=async (req,res)=>{
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    let seekerProfile=await SeekerProfile.findOne({where:{
        UserID:candidate.userId
    }})
//    seekerProfile.email=decodedToken.email;
const email=decodedToken.email;
seekerProfile=seekerProfile.dataValues
seekerProfile={...seekerProfile,email}

    res.status(200).send({
       seekerProfile,
        success:true
    })

}

module.exports={createSeekerProfile,uploadProfilePic,uploadResume,deleteResume,deleteProfilePic,getSeekerProfile}