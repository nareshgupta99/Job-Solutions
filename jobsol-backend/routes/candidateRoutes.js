const express=require("express");
const { updateCandidateProfile, uploadResume, uploadProfilePic } = require("../controler/candidateControler");
const router=express.Router();



router.post("/candidate/profile",updateCandidateProfile);

router.post("/candidate/resume",uploadResume);

router.post("/candidate/profile-pics/",uploadProfilePic)

router.post("/candidate/create-alert");

router.get("/candidate/alert/:userId");

router.patch("candidate/alert/:alertId")

router.get("candidate/applies/:userId");

router.get("/candidate/apply/:applyId");

router.post("/candidate/apply");

router.post("/candidate/project");

router.get("/candidate/projects");

router.get("/candidate/project/:projectId");

router.get("/candidates/:jobId");

