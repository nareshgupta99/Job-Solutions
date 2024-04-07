const mysqlpool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");


const signupCandidate = async (req, res, next) => {

    const { name, email, password, phone } = req.body;
    try {
        const data = await loadUserByUserName(email, "candidate")
        if (data[0].length > 0) {
            res.status(200).send({
                email,
                message: "user is already registerd try with other email "
            })

        } else {
            const saltRounds = 10;
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            console.log(encryptedPassword)
            mysqlpool.query(`insert into candidate(name,email,password,phone,is_enabled) values (?,?,?,?,?)`, [name, email, encryptedPassword, phone, true]);

            const jwt_token = genrateToken(email, true);

            res.status(200).send({
                token: jwt_token,
                is_enabled: true
            });
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "internal server error"
        })
    }



}


const candidateLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await loadUserByUserName(email, "candidate");
        if (data[0].length == 0) {

            res.status(500).send({
                message: "user is not registerd"
            })
        }
       
        const {  is_enabled, password } = data[0][0];
        bcrypt.compare(password, req.body.password).then(function (err, result) {
            if (result === false) {
                res.status(500).send({
                    message: "username or password is wrong"
                })
            } else {

                const token = genrateToken(email, is_enabled);
                res.status(200).send({
                    token,
                    is_enabled
                })

            }
        });



    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error"
        })

    }


}

const employerSignup = async (req, res, next) => {

    const { contact_person, email, password, phone,number_employee,designation,company_name } = req.body;
    try {
        const data = await loadUserByUserName(email, "employer")
        if (data[0].length > 0) {
            res.status(200).send({
                email,
                message: "employer is already registerd try with other email "
            })

        } else {
            const saltRounds = 10;
            const encryptedPassword = await bcrypt.hash(password, saltRounds)
            console.log(encryptedPassword)
            mysqlpool.query(`insert into employer(email,password,phone,contact_person,number_employee,designation,company_name,is_enabled) values (?,?,?,?,?,?,?,?)`,
             [ email, encryptedPassword, phone, contact_person,number_employee,designation,company_name,true]);

            const jwt_token = genrateToken(email, true);

            res.status(200).send({
                token: jwt_token,
                is_enabled: true
            });
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "internal server error"
        })
    }



}

const employerLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await loadUserByUserName(email, "employer");
        if (data[0].length == 0) {

            res.status(500).send({
                message: "user is not registerd"
            })
        }
       
        const {  is_enabled, password } = data[0][0];
        bcrypt.compare(password, req.body.password).then(function (err, result) {
            if (result === false) {
                res.status(500).send({
                    message: "username or password is wrong"
                })
            } else {

                const token = genrateToken(email, is_enabled);
                res.status(200).send({
                    token,
                    is_enabled
                })

            }
        });



    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error"
        })

    }
}


const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const users = await loadUserByUserName(email, "candidate")
        if (users[0].length == 0) {
            res.status(200).json({
                message: "user email is not registerd"
            })
        }
        //genrate a password reset token
        const reset_token = crypto.randomBytes(32)
            .toString('hex');
        const expires_in = new Date(Date.now() + (10 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ');

        console.log(expires_in)
        //genrate a hashed string
        const hashedToken = createHash(reset_token);
        //saved into database
        mysqlpool.query("update user set password_reset_token=?,expires_in=? where email=?", [hashedToken, expires_in, email]);
        const subject = "password change request"
        const url = `${req.protocol}://${req.get('host')}/api/auth/user/reset-password/${reset_token}`;
        const message = `To reset this password click here \n\n ${url}`
        try {
            await sendEmail({ email, subject, message });
            res.status(200).send({
                message: "email sent successfully check your inbox"
            })
        } catch (err) {
            res.status(500).json({
                message: "email service error",
                err
            })
        }

        // res.status(200);
    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const requestedHash = createHash(resetToken);
    console.log(requestedHash)
    try {
        const data = await mysqlpool.query("select * from user where password_reset_token=?", [requestedHash]);
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




module.exports = { signupCandidate, candidateLogin, forgotPassword, resetPassword, verifyEmail,employerSignup,employerLogin,loadUserByUserName }