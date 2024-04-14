const mysqlpool = require("../config/db");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { getCredentialFromToken } = require("../utils/checkAuth");
const { loadUserByUserName } = require("./authControler");

const createApply = asyncErrorHandler(async (req, res,next) => {
    const decodedToken = getCredentialFromToken();
    const [[candidate]] = await loadUserByUserName(decodedToken.username, "employer");
    if(!candidate){
        next(new ApiError("internal server error",500));
    }
    else{

        const {jobid}=req.params;
        const result=await mysqlpool.query("insert into apply (status,job_id,candidate_id) values(?,?,?)",["",jobid],decodedToken.candidate_id);
        res.status(201).json({
            message:"Application sent successfull",
            success:true
        })
    }

})


const getApplyById = asyncErrorHandler(async (req, res) => {
    const decodedToken = getCredentialFromToken();
    const [[candidate]] = await loadUserByUserName(decodedToken.username, "candidate");
    if(!candidate){
        next(new ApiError("internal server error",500));
    }
    else{
        const {applyid}=req.params;
       const [[result]]=await mysqlpool.query("select * from apply where apply_id=?",[applyid]);
       res.status(200).json({
        data:result,
        success:true
       })
    }
})

const getAppliedByCandidate = asyncErrorHandler(async (req, res) => {
    const decodedToken = getCredentialFromToken();
    const [[candidate]] = await loadUserByUserName(decodedToken.username, "candidate");
    if(!candidate){
        next(new ApiError("internal server error",500));
    }
    // const [applies]=select * from 


})




const getAppliedJobByJobId=asyncErrorHandler(async(req,res)=>{

})


module.exports = { createApply,  getApplyById ,getAppliedJobByJobId,getAppliedByCandidate};