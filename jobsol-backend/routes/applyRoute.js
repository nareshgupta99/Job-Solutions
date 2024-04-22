const express=require("express");
const { updateJobStatusById, createApplication, getApplicationById, getAllApplicationBySeeker, getAllApplicationJobByJobId} = require("../controler/applyControler");
const { isAuthenticated, hasRole } = require("../utils/Auth");
const router=express.Router();


router.get("/job/apply/seeker",isAuthenticated,hasRole("ROLE_SEEKER"),getAllApplicationBySeeker);
router.post("/job/apply/:jobid",isAuthenticated,hasRole("ROLE_SEEKER"),createApplication);
router.get("/job/apply/:applicationId",isAuthenticated,hasRole("ROLE_SEEKER"),getApplicationById);
router.get("/job/apply/employeer/:jobId",isAuthenticated,hasRole("ROLE_EMPLOYEER"),getAllApplicationJobByJobId);
router.patch("/job/apply/employeer/:applicationId",isAuthenticated,hasRole("ROLE_EMPLOYEER"),updateJobStatusById);

module.exports=router;