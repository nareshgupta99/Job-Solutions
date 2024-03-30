const mysqlpool = require("../config/db");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res, next) => {
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
            const jwt_token = genrateToken(email, role);
            res.status(200).json({
                token: jwt_token
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


const loginUser = async (req, res, next) => {

}

const genrateToken = (username, role) => {
    const expiresIn = process.env.EXP_TIME;
    const secret = process.env.SECRET;
    const token = jwt.sign({ username, role }, secret, {
        expiresIn
    });
    return token;
}

const loadUserByUserName = async (userName) => {

    const user = await mysqlpool.query(`select name ,email,is_enabled from user where email='${userName}'`);
    return user;
}




module.exports = { signupUser, loginUser }