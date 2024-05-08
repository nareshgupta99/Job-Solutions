const mysqlpool = require("../config/db");
const SeekerProfile = require("../models/SeekerProfile");
const {checkJwt} = require("../utils/Auth");
const { getCredentialFromToken } = require("../utils/Auth");
const { loadUserByUserName } = require("./authControler");

    const getLoggedUser=async (req,response)=>{
        const decodedToken = getCredentialFromToken();
        let user = await loadUserByUserName(decodedToken.email);
        user=user.dataValues;
        const {userId}=user;
        const role=user.roles;
        
        let res=false
        for(let i=0;i<role.length;i++){
          let roleName=  role[i].dataValues.roleName;
          if(roleName=="ROLE_SEEKER"){
            res=true
            break;
          }
        }

        let userProfile;
        if(res){
            userProfile=await SeekerProfile.findOne({
                where:{
                    UserId:userId
                },attributes:['name','imageUrl']
            })
        }

        // removing aaray of entry from object
        let { passwordResetToken,expiresIn,roles,password, ...newuser } = user;
        const {name,imageUrl}=userProfile.dataValues;
        
        newuser={...newuser,name,imageUrl};

        response.json(newuser)

       
        
    }


module.exports={getLoggedUser};