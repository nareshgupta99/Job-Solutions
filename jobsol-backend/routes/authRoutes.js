const express=require("express");
const { signupUser, loginUser, forgotPassword, resetPassword, verifyEmail } = require("../controler/authControler");

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

router.post("/user/signup",signupUser);
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
router.post("/user/login",signupUser);
router.post("/user/login",loginUser);
router.post("/user/forgot-password",forgotPassword);
router.patch("/user/reset-password/:resetToken",resetPassword);
// router.patch("/user/:verifyToken",verifyEmail);


module.exports=router;