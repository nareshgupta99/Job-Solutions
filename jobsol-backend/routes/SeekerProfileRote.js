const express=require("express");
const {isAuthenticated, hasRole}=require("../utils/Auth");
const { createSeekerProfile, uploadResume, uploadProfilePic, deleteResume, deleteProfilePic, getSeekerProfile } = require("../controler/SeekerProfileController");
const singleUpload=require("../middleware/multer");
const router=express.Router();

router.post("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),createSeekerProfile);
router.patch("/seeker/profile/pic",isAuthenticated,hasRole("ROLE_SEEKER"),singleUpload,uploadProfilePic);
router.patch("/seeker/resume",isAuthenticated,hasRole("ROLE_SEEKER"),singleUpload,uploadResume);
router.delete("/seeker/resume",isAuthenticated,hasRole("ROLE_SEEKER"),singleUpload,deleteResume);
router.delete("/seeker/profile/pic",isAuthenticated,hasRole("ROLE_SEEKER"),singleUpload,deleteProfilePic);
router.get("/seeker/profile",isAuthenticated,hasRole("ROLE_SEEKER"),getSeekerProfile);


module.exports=router;