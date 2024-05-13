const express=require("express");
const {  getLoggedUser } = require("../controler/userControler");
const { isAuthenticated } = require("../utils/Auth");
const router=express.Router();

router.get("/user",isAuthenticated,getLoggedUser);





module.exports=router;