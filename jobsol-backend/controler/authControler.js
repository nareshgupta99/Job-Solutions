const mysqlpool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const dotenv = require("dotenv");
const User = require("../models/User");
const { Role } = require("../models/Role");
dotenv.config();

const userRegistration = asyncErrorHandler(async (req, res, next) => {
    let user = req.body
    const { roleName } = req.body;
    console.log(roleName)
    const data = await loadUserByUserName(user.email, "");
    console.log(data)
    if (data && isRoleValid(data.roles, roleName)) {
        next(new ApiError("user is already registerd", 200));
    } else {
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(user.password, saltRounds);
        user = { ...user, password: encryptedPassword }
        const role = await Role.findAll({ where: { roleName: roleName } })


        let jwt_token = "";
        if (data) {
            data.password = encryptedPassword;
            await data.addRoles(role);
            await data.save();
            jwt_token = genrateToken({ email: user.email, userId: data.UserId, is_enabled: true });
        }
        else {
            const savedUser = await User.create(user)
            await savedUser.addRoles(role)// This will insert a new row in the userRole join table
            jwt_token = genrateToken({ email: user.email, userId: savedUser.UserId, is_enabled: true });

        }


        res.status(200).send({
            message: "user Registered successfully",
            token: jwt_token,
            is_enabled: true
        });
    }

})


const userLogin = asyncErrorHandler(async (req, res, next) => {
    console.log("logon bhjfhv")
    const { email, password } = req.body;
    const user = await loadUserByUserName(email, "");
    console.log("user", user)
    if (!user) {
        next(new ApiError("email is not registerd", 401));
        console.log("else")
    } else {
        console.log("else")
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            next(new ApiError("username or password is wrong", 401));
        } else {

            const token = genrateToken({ email: user.email, userId: user.UserId, is_enabled: true, roles: user.roles });
            res.status(200).send({
                message: "user login succesfully",
                token,
                is_enabled: true
            })

        }
    }

})



const forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const { email } = req.body;
    const [[users]] = await loadUserByUserName(email, "candidate")
    if (!users) {
        next(new ApiError("email is not registerd", 401));
    }
    //genrate a password reset token
    const reset_token = crypto.randomBytes(32)
        .toString('hex');
    const expires_in = new Date(Date.now() + (10 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ');

    console.log(expires_in)
    //genrate a hashed string
    const hashedToken = createHash(reset_token);
    //saved into database
    mysqlpool.query("update candidate set password_reset_token=?,expires_in=? where email=?", [hashedToken, expires_in, email]);
    const subject = "password change request"
    // const url = `${req.protocol}://${req.get('host')}/api/auth/candidate/reset-password/${reset_token}`;
    const url = `${process.env.ORIGIN}/candidate/reset/${reset_token}`;
    const message = `To reset this password click here \n\n ${url}`

    await sendEmail({ email, subject, message });

    res.status(200).send({
        message: "email sent successfully check your inbox"
    })
})

const resetPassword = async (req, res, next) => {
    console.log("i am in reset Password")
    const { resetToken } = req.params;
    const requestedHash = createHash(resetToken);
    console.log(requestedHash)
    try {
        const [[data]] = await mysqlpool.query("select * from candidate where password_reset_token=?", [requestedHash]);
        if (!data) {
            next(new ApiError("something went wrong try again"));
        }
        console.log(data)
        const expires_in = new Date(data.expires_in);
        const currentDateTime = new Date();
        console.log("expires_in", expires_in);

        console.log(new Date())
        if (expires_in > currentDateTime) {

            mysqlpool.query("update candidate set password =? where password_reset_token=?", [req.body.password, requestedHash])
            res.status(200).json({
                message: "password set successfully"
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

const loadUserByUserName = async (userName, table_name) => {
    // const user = await mysqlpool.query(`select * from ${table_name} where email=?`, [userName]);
    // return user;
    return await User.findOne({
        where: { email: userName }, include: {
            model: Role
        }
    })

}

const isRoleValid = (roles, role) => {
    const res = roles.find((r) => r.roleName === role);
    console.log("res", res)
    return res;

}


module.exports = { userRegistration, userLogin, forgotPassword, resetPassword, verifyEmail, loadUserByUserName }