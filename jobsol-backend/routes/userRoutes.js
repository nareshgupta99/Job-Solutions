const express=require("express");
const { UploadPicture, updateUserProfile, uploadResume, getAllUsers } = require("../controler/userControler");
const upload=require("../config/multer");
const router=express.Router();

router.post('/upload', upload.single('profilePic'), UploadPicture);
router.post('/user/profile',updateUserProfile);
router.post('/user/resume',uploadResume);
router.get("/",getAllUsers)




module.exports=router;