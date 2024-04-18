const jwt = require("jsonwebtoken");
const dotev = require("dotenv");
const ApiError = require("./ApiError");


dotev.config();

let decodedToken = "";

const isAuthenticated = async (req, res, next) => {
    console.log("in Authenticated")
    try {
        let token = req.headers.authorization;
        
        if (!token) {
            throw new ApiError("Invalid Token", 401)
        }
        token = token.split("Bearer")[1].trim()
        decodedToken = jwt.verify(token, process.env.SECRET);
        console.log(decodedToken)
        if (Date.now() < new Date(decodedToken.exp)) {
            throw new ApiError("Jwt Token is Expired", 401);
        }
        next();
    } catch (err) {
        res.status(err.status).send({
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

const hasROle = (authoriseRole) => {
    //1. get roles from token 
    let {email}=decodedToken;
    

    //2. math the roles from recieved roles in arguements


    //3.throw error if not match else call the next function 
}


module.exports = { isAuthenticated, getCredentialFromToken, hasROle };