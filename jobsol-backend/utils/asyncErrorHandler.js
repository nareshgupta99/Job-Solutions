const ApiError=require("../utils/ApiError");
const asyncErrorHandler=(func)=>async(req,res,next)=>{
    try{
       await func(req,res,next);
    }catch(err){
        next(new ApiError(err.message,err.status));
    }
}

module.exports=asyncErrorHandler;