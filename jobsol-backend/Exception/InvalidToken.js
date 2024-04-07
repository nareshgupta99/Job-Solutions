class InvalidToken extends Error{
    constructor(message){
        super("Jwt token is Invalid");
        this.message=message;
    }
}

module.exports=InvalidToken;