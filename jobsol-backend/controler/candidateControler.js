const mysqlpool = require("../config/db")
const ApiError=require("../utils/ApiError");

const updateCandidateProfile=async (req,res,next)=>{
    const decodedToken = getCredentialFromToken();
    const [[candidate]] = await loadUserByUserName(decodedToken.username, "candidate");
    const {profile_summary,dob,expected_salery,carrer_break,gender}=req.body;
    try{
        
        const data=await mysqlpool.query("insert into candidate (profile_summary,dob,expected_salery,carrer_break,gender)values(?,?,?,?,?)",
        [profile_summary,dob,expected_salery,carrer_break,gender]);
        if(data[0].length>0){
            res.status(200).send({
                message:"profile updated succeessfully"
            })
        }else{
            next(new ApiError("something wrong while updating candidate",500))
        }
    }catch(err){
        next(new ApiError("something wrong while updating candidate",500))
    }


}

const uploadResume=async (req,res)=>{

}

const uploadProfilePic=async(req,res)=>{

}

const getCandidate=async (req,res)=>{
    const token=req.body.token;
    const decodedToken = getCredentialFromToken();
    const [[candidate]] = await loadUserByUserName(decodedToken.username, "candidate");

}



module.exports={updateCandidateProfile,uploadResume,uploadProfilePic};