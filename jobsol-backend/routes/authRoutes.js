const express=require("express");
const { signupUser, loginUser, forgotPassword, resetPassword, verifyEmail } = require("../controler/authControler");

const router=express.Router();



router.post("/user/signup",signupUser);

router.post("/user/login",loginUser);
router.post("/user/forgot-password",forgotPassword);
router.patch("/user/reset-password/:resetToken",resetPassword);
// router.patch("/user/:verifyToken",verifyEmail);


module.exports=router;