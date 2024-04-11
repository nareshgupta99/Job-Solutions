const express=require("express");
const {   resetPassword, verifyEmail, signupCandidate, candidateLogin, employerSignup, employerLogin, forgotPasswordCandidate } = require("../controler/authControler");

const router=express.Router();


/**
 * @swagger
 * /api/auth/user/signup:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created user
 *       '400':
 *         description: Bad request, invalid data provided
 */

router.post("/user/signup",signupCandidate);
/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Use to login a new user
 *     responses:
 *       '200':
 *         description: return jwt token
 *       '500':
 *         description: user or password is wrong
 */
router.post("/candidate/signup",signupCandidate);
router.post("/candidate/login",candidateLogin);
router.post("/candidate/forgot-password",forgotPasswordCandidate);
router.patch("/user/reset-password/:resetToken",resetPassword);
// router.patch("/user/:verifyToken",verifyEmail);
router.post("/employer/signup",employerSignup)
router.post("/employer/login",employerLogin)



module.exports=router;