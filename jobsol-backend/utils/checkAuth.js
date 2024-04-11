const jwt = require("jsonwebtoken");
const dotev = require("dotenv");
const TokenExpired = require("../utils/ApiError");
dotev.config();

let decodedToken = "";

const checkJwt = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token.split("Bearer")[1].trim()
        decodedToken = jwt.verify(token, process.env.SECRET);
        if (Date.now() < new Date(decodedToken.exp)) {
            throw new APiError("Jwt Token is Expired",401);
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error",
            error: err
        })

    }
    next()
}

const getCredentialFromToken = () => {
    return decodedToken;
}



module.exports = { checkJwt, getCredentialFromToken };