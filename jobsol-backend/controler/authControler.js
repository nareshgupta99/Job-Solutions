const mysqlpool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const signupUser = async (req, res) => {
    const { name, email, password, confirmPassword, role, phone } = req.body;
    const data = loadUserByUserName(email).then((data) => {
        console.log(data[0]);
        if (data[0].length > 0) {
            res.status(200).send({
                email,
                message: "user is already registerd try with other email "
            })
        }


    })

    const role_id = await mysqlpool.query(`select id from role where role_name=?`, [role]);
    const { id } = role_id[0][0];
    mysqlpool.query(`insert into user(name,email,password,phone,is_enabled) values (?,?,?,?,?)`, [name, email, password, phone, true]).then(() => {
        console.log("creating user_role")
        mysqlpool.query(`insert into user_role(user_id,role_id) values (?,?)`, [email, id]).then(() => {
            console.log("genrate jwt")
            const jwt_token = genrateToken(email, role, true);
            res.status(200).json({
                token: jwt_token,
                role,
                is_enabled: true
            });
        }).catch(() => {
            res.status(500).json({
                message: "internal jwt  server error"
            })
        })
    }).catch(() => {
        res.status(500).json({
            message: "internal server error"
        })
    })


}


const loginUser = async (req, res) => {
    const { email } = req.body;
    const data = await loadUserByUserName(email);
    if (data[0].length > 0) {
        const { email, role, is_enabled, password } = data[0][0];
        const role_id = await mysqlpool.query(`select role_id from user_role where user_id="${email}"`);
        const role_result = await mysqlpool.query(`select role_name from role where id=${role_id[0][0].role_id}`);
        const { role_name } = role_result[0][0]
        if (password == req.body.password) {
            const token = genrateToken(email, role, is_enabled);
            res.status(200).send({
                token,
                role: role_name,
                is_enabled
            })
        }
        else {
            res.status(500).send({
                message: "username or password is wrong"
            })
        }
    } else {

        res.status(500).send({
            message: "email is not registerd"
        })
    }

}


const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const users = await loadUserByUserName(email)
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
        console.log("expires_in",expires_in);
        console.log(new Date())
        if(expires_in>currentDateTime){

            mysqlpool.query("update user set password =? where password_reset_token=?", [req.body.password, requestedHash])
            res.status(200).json({
                message: "password set successfully"
            })
        }else{
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

const genrateToken = (username, role, is_enabled) => {
    const expiresIn = process.env.EXP_TIME;
    const secret = process.env.SECRET;
    const token = jwt.sign({ username, role, is_enabled }, secret, {
        expiresIn
    });
    return token;
}

const verifyEmail = (req, res) => {
    const { verifyToken } = req.params;

}

const loadUserByUserName = async (userName) => {
    const user = await mysqlpool.query(`select name ,email,is_enabled,password from user where email='${userName}'`);
    return user;
}





module.exports = { signupUser, loginUser, forgotPassword, resetPassword, verifyEmail }