const express=require("express");
const { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId, getJobsByProfileName } = require("../controler/jobControler");
const { isAuthenticated, hasRole } = require("../utils/Auth");

const router=express.Router();

router.post("/employeer/job/create",isAuthenticated,hasRole("ROLE_EMPLOYEER"),createJob);

router.get("/job",getAllJobs);

router.get("/job/:jobId",getJobById);

router.get("/jobs/employer",isAuthenticated,hasRole("ROLE_EMPLOYEER"),getJobsByEmployer);

router.get("/jobs/location/:location",getJobsByLocation);

router.get("/jobs/profile/:profile",getJobsByProfileName);

router.get("/job/search")

router.delete("/job/:jobId",isAuthenticated,hasRole("ROLE_EMPLOYEER"),deleteJobByJobId);


module.exports=router;