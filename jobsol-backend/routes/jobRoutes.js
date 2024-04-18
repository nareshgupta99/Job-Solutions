const express=require("express");
const { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId } = require("../controler/jobControler");
const { isAuthenticated } = require("../utils/Auth");

const router=express.Router();

router.post("/employeer/job/create",isAuthenticated,createJob);

router.get("/jobs",getAllJobs);

router.get("/job/:jobId",getJobById);

router.get("/jobs/employer/",getJobsByEmployer);

router.get("/jobs/location/:location",getJobsByLocation);

router.delete("/job/:jobId",deleteJobByJobId);

module.exports=router;