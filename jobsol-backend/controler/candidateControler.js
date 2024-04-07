const mysqlpool = require("../config/db")

const updateCandidateProfile=async (req,res,next)=>{
    const {profile_summary,dob,expected_salery,carrer_break,gender}=req.body;
    try{
        
        const data=await mysqlpool.query("insert into candidate (profile_summary,dob,expected_salery,carrer_break,gender)values(?,?,?,?,?)",
        [profile_summary,dob,expected_salery,carrer_break,gender]);
        if(data[0].length>0){
            res.status(200).send({
                message:"profile updated succeessfully"
            })
        }else{
            res.status(500).send({
                message:"something wrong while updating candidate"
            }) 
        }
    }catch(err){
        res.status(500).send({
            message:"something wrong while updating candidate"
        })
    }


}

const uploadResume=async (req,res)=>{

}

const uploadProfilePic=async(req,res)=>{

}



module.exports={updateCandidateProfile,uploadResume,getAllCandidateDetails,uploadProfilePic};