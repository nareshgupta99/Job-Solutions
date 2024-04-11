class ApiResponse {
    constructor(status,data,succeess,message){
        this.status=status;
        this.data=data;
        this.succeess=succeess;
        this.message=message;

    }
}

module.exports=ApiResponse;