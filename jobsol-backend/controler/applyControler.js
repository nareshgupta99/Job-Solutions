const Job = require("../models/Job");
const Application = require("../models/Application");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { getCredentialFromToken } = require("../utils/Auth");
const { loadUserByUserName } = require("./authControler");

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
        SeekerID:candidate.userId
    }})
    res.status(200).json({
        applications,
        success:true
    })
})

const getAllApplicationJobByJobId = asyncErrorHandler(async (req, res) => {
    const {jobId}=req.params
    const applications=await Application.findAll({
        where:{
            JObID:jobId
        }
    })
    res.status(200).json({
        applications,
        success:true
    })
})


const updateJobStatusById=asyncErrorHandler(async (req,res)=>{
    const {applicationId}=req.params;
    const {ApplicationStatus}=req.body;
   const application=await  Application.findOne({where:{
        ApplicationId:applicationId
    }})
    application.ApplicationStatus=ApplicationStatus;
    await application.save();
    res.status(200).json({
        application,
        success:true

    })
})

module.exports = { createApplication, getAllApplicationJobByJobId, getApplicationById, getAllApplicationBySeeker,updateJobStatusById };