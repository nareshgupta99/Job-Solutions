const mysqlpool = require("../config/db");
const Job = require("../models/Job");
const { getCredentialFromToken } = require("../utils/Auth");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { loadUserByUserName } = require("./authControler");
const { Op } = require('sequelize');


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
    
        const jobs = await Job.findAll({
          offset: offset,
          limit: parseInt(limit, 10),
        });
    
    //   const jobs = await Job.findAllPaginated(Job, options);
    // const jobs = await Job.findAll();
    console.log(jobs);
    res.status(200).send({
        jobs,
        success: true
    })

})

const getJobById = asyncErrorHandler(async (req, res) => {

    const { jobId } = req.params;
    const job = await Job.findOne({
        where: {
            jobId: jobId,
        }
    });

    res.status(200).send({ job })


})

const getJobsByEmployer = asyncErrorHandler(async (req, res) => {

    const decodedToken = getCredentialFromToken();
    const employer = await loadUserByUserName(decodedToken.email);

    let jobs = await Job.findAll({
        where: {
            employeerId: employer.userId
        }
    });

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