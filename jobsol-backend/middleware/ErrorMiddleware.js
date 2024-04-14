const errorMiddleware=(err,req,res,next)=>{
    console.log("i am in global error",err.status,err.success)
    err.status=err.status || 500;
    err.message=err.message || "Internal Server Error";
    console.log("err",err)

    res.status(err.status).json({
        message:err.message,
        success:err.success
    })
}

module.exports=errorMiddleware;