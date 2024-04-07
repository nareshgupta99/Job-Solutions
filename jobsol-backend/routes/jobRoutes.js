const express=require("express");
const { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId } = require("../controler/jobControler");

const router=express.Router();

router.post("/job/create",createJob);

router.get("/jobs",getAllJobs);

router.get("/job/:jobId",getJobById);

router.get("/jobs/employer/",getJobsByEmployer);

router.get("/jobs/location/:location",getJobsByLocation);

router.delete("/job/:jobId",deleteJobByJobId);

module.exports=router;