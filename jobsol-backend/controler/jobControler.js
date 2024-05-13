const mysqlpool = require("../config/db");
const Job = require("../models/Job");
const { getCredentialFromToken } = require("../utils/Auth");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { loadUserByUserName } = require("./authControler");
const { Op } = require('sequelize');
const Application=require("../models/Application");
const User = require("../models/User");
const EmployerProfile = require("../models/EmployerProfile");

const createJob = asyncErrorHandler(async (req, res) => {
    // get email from token
    const decodedToken = await getCredentialFromToken();
    const employer = await loadUserByUserName(decodedToken.email);
    console.log(employer)
    let job = req.body;
    const savedJob = await Job.create(job);
    await savedJob.setUser(employer)

    res.status(201).send({
        message: "job posted successfull"
    })
})


const getAllJobs = asyncErrorHandler(async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
        let jobs = await Job.findAll({
          offset: offset,
          limit: parseInt(limit, 10),
        });

        // for(let i=0;i<jobs.length;i++){
        //     let {employeerId}=jobs[i].dataValues.employeerID
            
        //     const profile=await EmployerProfile.findOne({where:{
        //         UserID:employeerId
        //     }})

        //     let companyName=profile.dataValues.companyName;

        //     jobs={...jobs,companyName}
        // }
       
    res.status(200).send({
        jobs,
        success: true
    })

})

const getJobById = asyncErrorHandler(async (req, res) => {

    const { jobId } = req.params;
    let job = await Job.findOne({
        where: {
            jobId: jobId,
        }
    });
    const application=await Application.findOne({
        where:{
            JobID:jobId
        }
    })
    const {dataValues}=job
    if(application){
        
        dataValues.application=application.dataValues.length;
        job={...dataValues}
    }else{
        dataValues.application=0
        job={...dataValues}
    }
        
    console.log(job)

    res.status(200).send({...job,success:true})


})

const getJobsByEmployer = asyncErrorHandler(async (req, res) => {

    const decodedToken = getCredentialFromToken();
    const employer = await loadUserByUserName(decodedToken.email);

    let jobs = await Job.findAll({
        where: {
            employeerId: employer.userId
        }
    });
     

    for(let i=0;i<jobs.length;i++){
            let job=jobs[i].dataValues
            console.log(job)
        let applications=await Application.findAll({
            where:{
                JobID:job.jobId
            }
        })

        jobs[i].dataValues.noOfApplication=applications.length

    }
    console.log(jobs)

    res.status(200).send({
        jobs
    })

})

const getJobsByLocation = asyncErrorHandler(async (req, res) => {

    const { location } = req.params
    const jobs = await Job.findAll({
        where: {
            location: {
                [Op.like]: `%${location}%`
            }
        }
    })
    res.status(200).send({
        jobs,
        success: true
    })
})


const deleteJobByJobId = asyncErrorHandler(async (req, res) => {

    const { jobId } = req.params;
    const job = await Job.findOne({
        where: {
            jobId: jobId
        }
    })
    if (job) {
        await Application.destroy({
            where:{
                jobId:jobId
            }
        })
        await Job.destroy({
            where: {
                jobId: jobId
            }
        })
        res.status(200).send({
            message: `${jobId} job is deleted successfully`
        })
    } else {
        res.status(200).send({
            message: `${jobId} job is not found`
        })
    }


})

const getJobsByProfileName = asyncErrorHandler(async (req, res) => {
    const { profile } = req.params
    const jobs = await Job.findAll({
        where: {
            profileName: {
                [Op.like]: `%${profile}%`
            }
        }
    })
    res.status(200).send({
        jobs,
        success: true
    })

})


module.exports = { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId, getJobsByProfileName }