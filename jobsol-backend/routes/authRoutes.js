const express=require("express");
const { signupUser, loginUser } = require("../controler/authControler");

const router=express.Router();

router.post("/user/signup",signupUser);
router.post("/user/login",loginUser);

module.exports=router;