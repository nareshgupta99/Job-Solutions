const express=require("express");
const { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId } = require("../controler/jobControler");
const { isAuthenticated, hasRole } = require("../utils/Auth");

const router=express.Router();

router.post("/employeer/job/create",isAuthenticated,hasRole("ROLE_EMPLOYEER"),createJob);

router.get("/jobs",getAllJobs);

router.get("/job/:jobId",getJobById);

router.get("/jobs/employer/",getJobsByEmployer,isAuthenticated);

router.get("/jobs/location/:location",getJobsByLocation);

router.delete("/job/:jobId",deleteJobByJobId,isAuthenticated);

module.exports=router;
