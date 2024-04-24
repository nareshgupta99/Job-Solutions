const express=require("express");
const {isAuthenticated, hasRole}=require("../utils/Auth");
const { createSeekerProfile, updateSeekerProfile, uploadResume, uploadProfilePic } = require("../controler/SeekerProfileController");
const singleUpload=require("../middleware/multer");
const router=express.Router();

router.post("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),createSeekerProfile);
router.patch("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),updateSeekerProfile);
router.patch("/seeker/profile/pic",isAuthenticated,hasRole("ROLE_SEEKER"),singleUpload,uploadProfilePic);
router.patch("/seeker/resume",isAuthenticated,hasRole("ROLE_SEEKER"),uploadResume);

module.exports=router;