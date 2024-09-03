const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const dotenv = require("dotenv");
const User = require("../models/User");
const { Role } = require("../models/Role");
const e = require("express");
const UserRole = require("../models/UserRole");
const { getCredentialFromToken } = require("../utils/Auth");


dotenv.config();

const userRegistration = asyncErrorHandler(async (req, res, next) => {
    let user = req.body
    const { roleName } = req.body;

    const data = await loadUserByUserName(user.email);

    if (data && isRoleValid(data.roles, roleName)) {
        next(new ApiError("user is already registerd", 200));
    } else {
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(user.password, saltRounds);
        user = { ...user, password: encryptedPassword }
        const role = await Role.findAll({ where: { roleName: roleName } })


        let jwt_token = "";
        // if user is present with different role
        if (data) {
            data.password = encryptedPassword;
            await data.addRoles(role);
            await data.save();
            const savedUser = await loadUserByUserName(data.email);

            jwt_token = genrateToken({ email: user.email, userId: data.UserId, is_enabled: true, roles: savedUser.dataValues.roles });
        }
        // if user is not present
        else {
            const savedUser = await User.create(user)
            await savedUser.addRoles(role)// This will insert a new row in the userRole join table
            const res = await loadUserByUserName(user.email);
            jwt_token = genrateToken({ email: user.email, userId: savedUser.UserId, is_enabled: true, roles: res.dataValues.roles });

        }


        res.status(200).send({
            message: "user Registered successfully",
            token: jwt_token,
            is_enabled: true,
            success: true
        });
    }

})


const userLogin = asyncErrorHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await loadUserByUserName(email);

    if (!user) {
        next(new ApiError("email is not registerd", 401));

    } else {

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            next(new ApiError("username or password is wrong", 401));
        } else {

            const token = genrateToken({ email: user.email, userId: user.UserId, is_enabled: true, roles: user.roles });
            res.status(200).send({
                message: "user login succesfully",
                token,
                is_enabled: true,
                success: true
            })

        }
    }

})



const forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const { email } = req.body;
    const user = await loadUserByUserName(email)
    if (!user) {
        next(new ApiError("email is not registerd", 401));
    }
    else {


        //genrate a password reset token
        const reset_token = crypto.randomBytes(32)
            .toString('hex');
        const expires_in = new Date(Date.now() + (10 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ');


        //genrate a hashed string
        const hashedToken = createHash(reset_token);
        user.passwordResetToken = hashedToken;
        user.expiresIn = expires_in;
        await user.save()
        //saved into database
        const subject = "password change request"
        // const url = `${req.protocol}://${req.get('host')}/api/auth/candidate/reset-password/${reset_token}`;
        const url = `${process.env.ORIGIN}/auth/user/reset/${reset_token}`;
        const message = `To reset this password click here \n\n ${url}`

        await sendEmail({ email, subject, message });

        res.status(200).send({
            message: "email sent successfully check your inbox",
            success: true
        })
    }
})

const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const requestedHash = createHash(resetToken);
    let user;
    try {
        user = await User.findOne({ where: { passwordResetToken: requestedHash } })
        if (!user) {
            next(new ApiError("something went wrong try again"));
        }

        const expires_in = new Date(user.expiresIn);
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        if (expires_in > new Date(currentDateTime)) {
            const saltRounds = 10;
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            user.password = encryptedPassword;
            user.passwordResetToken = "";
            await user.save();
            res.status(200).json({
                message: "password set successfully",
                success: true
            })
        } else {
            next(new ApiError("token is expire ", 400));
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "something went wrong"
        })
    }
}




const createHash = (reset_token) => {
    const hashedToken = crypto.createHash("sha256");
    hashedToken.update(reset_token);
    const hashedString = hashedToken.digest('hex');
    return hashedString;
}

const genrateToken = (payload) => {
    const expiresIn = process.env.EXP_TIME;
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, {
        expiresIn
    });
    return token;
}

const verifyEmail = (req, res) => {
    const { verifyToken } = req.params;

}

const loadUserByUserName = async (userName) => {
    return await User.findOne({
        where: { email: userName }, include: {
            model: Role
        }
    })

}

const isRoleValid = (roles, role) => {
    const res = roles.find((r) => r.roleName === role);
    return res;

}


const getLoggedUser = async (req, res) => {
    const decodedToken = getCredentialFromToken();
    const candidate = await loadUserByUserName(decodedToken.email);
    res.status(201).json({
        candidate,
        message: "Application sent successfull",
        success: true
    })
}

const changePassword=async(req,res)=>{
    const decodedToken = getCredentialFromToken();
    const user = await loadUserByUserName(decodedToken.email);
    const data=req.body;
    const result = await bcrypt.compare(data.OldPassword,user.dataValues.password );
    if (result){
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(data.NewPassword, saltRounds);
        user.password=encryptedPassword
        user.save();
        res.status(200).json({
            success:true,
            message:"password updated"
        }
    
        )
    }
    else{
        res.status(400).json({
            success:false,
            message:"old password not match"
        }
    
        )
    }

   

}

module.exports = { userRegistration, userLogin,changePassword, forgotPassword, resetPassword, verifyEmail, loadUserByUserName, getLoggedUser }