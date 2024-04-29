const express=require("express");
const router=express.Router();
const {isAuthenticated, hasRole}=require("../utils/Auth");
const { createEmployeerProfile, getEmployeerProfile } = require("../controler/employeerProfileController");

router.post("/employeer/profile",isAuthenticated,hasRole("ROLE_EMPLOYEER"),createEmployeerProfile);
router.get("/employeer/profile",isAuthenticated,hasRole("ROLE_EMPLOYEER"),getEmployeerProfile)


module.exports=router;