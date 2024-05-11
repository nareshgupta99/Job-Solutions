const jwt = require("jsonwebtoken");
const dotev = require("dotenv");
const ApiError = require("./ApiError");
const asyncErrorHandler = require("./asyncErrorHandler");
const User = require("../models/User");
const { Role } = require("../models/Role");



dotev.config();

let decodedToken = "";

const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
             new ApiError("Invalid Token", 401)
        }
        token = token.split("Bearer")[1].trim()
        decodedToken = jwt.verify(token, process.env.SECRET);
        if (Date.now() < new Date(decodedToken.exp)) {
            new ApiError("Jwt Token is Expired", 401);
        }
        next();
    } catch (err) {
        res.status(401).send({
            message: err.message,
            success: false
        })

    }
}

const getCredentialFromToken = (req, res, err, next) => {
    // let token = req.headers.authorization;
    // return jwt.verify(token, process.env.SECRET);
    return decodedToken;
}

const role = asyncErrorHandler(async (authoriseRole) => {
    //1. get roles from token 
    let { email } = decodedToken;

    const user = await User.findOne({
        where: { email },
        include: {
            model: Role,
            through: 'UserRole' // This should be the name of your intermediate table
        }
    });
    const userRoles = user.roles;
    const roleNames = userRoles.map(role => role.dataValues.roleName);


    //2. math the roles from recieved roles in arguements

    let result = roleNames.includes(authoriseRole);


    //3.throw error if not match else call the next function 

    if (result) next();
    else throw new ApiError("Not authorised", 401);

})

const hasRole = (authoriseRole) => {
    return asyncErrorHandler(
        async (req, res, next) => {
            console.log("in role function")
            //1. get roles from token 
            let { email } = decodedToken;
            console.log("email",email)
            const user = await User.findOne({
                where: { email },
                include: {
                    model: Role,
                    through: 'UserRole' // This should be the name of your intermediate table
                }
            });
            const userRoles = user.roles;
            const roleNames = userRoles.map(role => role.dataValues.roleName);
            console.log("roles",roleNames)


            //2. math the roles from recieved roles in arguements

            let result = roleNames.includes(authoriseRole);

            console.log(result)
            //3.throw error if not match else call the next function 

            if (result) next();
            else throw new ApiError("Not authorised", 401);
        }
    )
}

module.exports = { isAuthenticated, getCredentialFromToken, hasRole };