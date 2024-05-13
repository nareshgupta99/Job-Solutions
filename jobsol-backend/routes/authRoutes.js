const express=require("express");
const {   resetPassword, verifyEmail,  userRegistration,  forgotPassword, userLogin, getLoggedUser, changePassword } = require("../controler/authControler");
const { isAuthenticated, hasRole } = require("../utils/Auth");

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

router.post("/user/signup",userRegistration
);
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

router.post("/user/login",userLogin);
router.post("/user/forgot-password",forgotPassword);
router.patch("/user/reset-password/:resetToken",resetPassword);
router.get("/user",isAuthenticated,getLoggedUser);
router.post("/change/password",isAuthenticated,changePassword)


module.exports=router;