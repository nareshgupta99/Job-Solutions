const express=require("express");
const router=express.Router();
const {isAuthenticated, hasRole}=require("../utils/Auth");
const { createEmployeerProfile, updateEmployeerProfile } = require("../controler/employeerProfileController");

router.post("/employeer/profile",isAuthenticated,hasRole("ROLE_EMPLOYEER"),createEmployeerProfile);

router.patch("/employeer/profile",isAuthenticated,hasRole("ROLE_EMPLOYEER"),updateEmployeerProfile);


module.exports=router;