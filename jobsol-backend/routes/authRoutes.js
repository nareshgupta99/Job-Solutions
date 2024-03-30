const express=require("express");
const { signupUser, loginUser, forgotPassword, resetPassword } = require("../controler/authControler");

const router=express.Router();

router.post("/user/signup",signupUser);
router.post("/user/login",loginUser);
router.post("/user/forgot-password",forgotPassword);
router.get("/user/reset-password/:resetToken",resetPassword);


module.exports=router;