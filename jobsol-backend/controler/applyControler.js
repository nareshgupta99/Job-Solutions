const Job = require("../models/Job");
const Application = require("../models/Application");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { getCredentialFromToken } = require("../utils/Auth");
const { loadUserByUserName } = require("./authControler");
const User = require("../models/User");
const SeekerProfile=require("../models/SeekerProfile");

const createApplication = asyncErrorHandler(async (req, res, next) => {
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    const { jobid } = req.params;
    const job = await Job.findOne({
        where: {
            jobId: jobid
        }
    })
    const savedApplication =await  Application.create({ ApplicationStatus: "PENDING", ApplicationDate: Date.now() });
    savedApplication.setUser(candidate);
    savedApplication.setJob(job);
    (await savedApplication).save();
    res.status(201).json({
        message: "Application sent successfull",
        success: true
    })


})


const getApplicationById = asyncErrorHandler(async (req, res) => {

    const { applicationId } = req.params;
    const application = await Application.findOne({
        where: {
            ApplicationID: applicationId
        }
    })
    res.status(200).json({
        application,
        success: true
    })
})


const getAllApplicationBySeeker = asyncErrorHandler(async (req, res) => {
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);   
    const applications=await Application.findAll({where:{
        SeekerID:candidate.userId,
    }})

    for(let i=0;i<applications.length;i++){
      let job= await Job.findOne({where:{
            jobId:applications[i].dataValues.JobID
        }})
        applications[i].dataValues.profileName=job.dataValues.profileName
        // applications[i].dataValues.profileName
    }
   
    res.status(200).json({
        applications,
        success:true
    })
})

const getAllApplicationsByJobId = asyncErrorHandler(async (req, res) => {
    const {jobId}=req.params
    const applications=await Application.findAll({
        where:{
            JObID:jobId
        }
    })

    let seekerProfile;
    let seeker;
    console.log(applications,"applications")
    for(let i=0;i<applications.length;i++){
      seekerProfile= await SeekerProfile .findOne({
            where:{
                userId:applications[i].SeekerID
            }
        }) 
        seeker= await User .findOne({
            where:{
                userId:applications[i].SeekerID
            }
        }) 
     
        const name=seekerProfile.dataValues.name
        const email=seeker.dataValues.email
        const resume=seekerProfile.dataValues.resumeUrl;
        const pic=seekerProfile.dataValues.imageUrl;
        applications[i].dataValues.name=name
        applications[i].dataValues.email=email
        applications[i].dataValues.resume=email
        applications[i].dataValues.resume=resume
        applications[i].dataValues.pic=pic   
    }
    
    
    res.status(200).json({
        applications,
        success:true
    })
})


const updateJobStatusById=asyncErrorHandler(async (req,res)=>{
    const {applicationId}=req.params;
    const {status}=req.body;
    console.log(req.body)
   const application=await  Application.findOne({where:{
        ApplicationId:applicationId
    }})
    application.ApplicationStatus=status;
    await application.save();
    res.status(200).json({
        application,
        success:true

    })
})



module.exports = { createApplication, getAllApplicationsByJobId, getApplicationById, getAllApplicationBySeeker,updateJobStatusById };