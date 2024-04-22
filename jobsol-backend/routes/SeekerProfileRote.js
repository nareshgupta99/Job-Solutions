const express=require("express");
const {isAuthenticated, hasRole}=require("../utils/Auth");
const { createSeekerProfile, updateSeekerProfile, updateProfilePic, uploadResume } = require("../controler/SeekerProfileController");
const router=express.Router();

router.post("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),createSeekerProfile);
router.patch("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),updateSeekerProfile);
router.patch("/seeker/profile-pic",isAuthenticated,hasRole("ROLE_SEEKER"),updateProfilePic);
router.patch("/seeker/resume",isAuthenticated,hasRole("ROLE_SEEKER"),uploadResume);

module.exports=router;