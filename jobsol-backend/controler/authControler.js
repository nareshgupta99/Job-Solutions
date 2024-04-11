const mysqlpool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const signupCandidate = asyncErrorHandler(async (req, res, next) => {

    const { name, email, password, phone } = req.body;
    const [[data]] = await loadUserByUserName(email, "candidate")
    if (data) {
        next(new ApiError("user is already registerd", 200));
    } else {
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        console.log(encryptedPassword)
        await mysqlpool.query(`insert into candidate(name,email,password,phone,is_enabled) values (?,?,?,?,?)`, [name, email, encryptedPassword, phone, true]);

        const jwt_token = genrateToken(email, true);

        res.status(200).send({
            token: jwt_token,
            is_enabled: true
        });
    }

})


const candidateLogin = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    const [[data]] = await loadUserByUserName(email, "candidate");
    console.log(data)
    if (!data) {
        next(new ApiError("email is not registerd", 401));
    } else {
        const { is_enabled, password } = data;
        const result = await bcrypt.compare(password, req.body.password);
        console.log(result, "result")
        if (!result) {
            next(new ApiError("username or password is wrong", 401));
        }
        else {

            const token = genrateToken(email, is_enabled);
            res.status(200).send({
                token,
                is_enabled
            })
        }
    }

})


const employerSignup = asyncErrorHandler(async (req, res, next) => {

    const { contact_person, email, password, phone, number_employee, designation, company_name } = req.body;
    const [[data]] = await loadUserByUserName(email, "employer")
    if (!data) {
        next(new ApiError(`${email} is already registerd try with other email`, 200));
    } else {
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        mysqlpool.query(`insert into employer(email,password,phone,contact_person,number_employee,designation,company_name,is_enabled) values (?,?,?,?,?,?,?,?)`,
            [email, encryptedPassword, phone, contact_person, number_employee, designation, company_name, true]);

        const jwt_token = genrateToken(email, true);

        res.status(200).send({
            token: jwt_token,
            is_enabled: true
        });
    }

})

const employerLogin = asyncErrorHandler(async (req, res) => {

    const { email } = req.body;
    const [[data]] = await loadUserByUserName(email, "employer");
    if (!data) {
        next(new ApiError("email is not registerd", 401));
    }
    else {
        const { is_enabled, password } = data[0][0];
        const result = await bcrypt.compare(password, req.body.password);
        if (result === false) {
            next(new ApiError("username or password is wrong", 401));
        } else {

            const token = genrateToken(email, is_enabled);
            res.status(200).send({
                token,
                is_enabled
            })

        }
    }

})


const forgotPasswordCandidate = asyncErrorHandler(async (req, res, next) => {

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
    mysqlpool.query("update candidate set token=?,expires_in=? where email=?", [hashedToken, expires_in, email]);
    const subject = "password change request"
    const url = `${req.protocol}://${req.get('host')}/api/auth/user/reset-password/${reset_token}`;
    const message = `To reset this password click here \n\n ${url}`


    const resut = await sendEmail({ email, subject, message });
    if (result) {
        res.status(200).send({
            message: "email sent successfully check your inbox"
        })    
    }
    else {
        next(new ApiError("email service error",500))
    }
    
})

const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const requestedHash = createHash(resetToken);
    console.log(requestedHash)
    try {
        const data = await mysqlpool.query("select * from token where password_reset_token=?", [requestedHash]);
        if (data[0].length == 0) {
            res.status(500).json({
                message: "something went wrong"
            })
        }
        const expires_in = new Date(data[0][0].expires_in);
        const currentDateTime = new Date();
        console.log("expires_in", expires_in);
        console.log(new Date())
        if (expires_in > currentDateTime) {

            mysqlpool.query("update user set password =? where password_reset_token=?", [req.body.password, requestedHash])
            res.status(200).json({
                message: "password set successfully"
            })
        } else {
            res.status(500).json({
                message: "time is expire"
            })
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

const genrateToken = (username, is_enabled) => {
    const expiresIn = process.env.EXP_TIME;
    const secret = process.env.SECRET;
    const token = jwt.sign({ username, is_enabled }, secret, {
        expiresIn
    });
    return token;
}

const verifyEmail = (req, res) => {
    const { verifyToken } = req.params;

}

const loadUserByUserName = async (userName, table_name) => {
    const user = await mysqlpool.query(`select * from ${table_name} where email='${userName}'`);
    return user;
}




module.exports = { signupCandidate, candidateLogin, forgotPasswordCandidate, resetPassword, verifyEmail, employerSignup, employerLogin, loadUserByUserName }