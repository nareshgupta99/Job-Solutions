const mysqlpool = require("../config/db");
const SeekerProfile = require("../models/SeekerProfile");
const {checkJwt} = require("../utils/Auth");
const { getCredentialFromToken } = require("../utils/Auth");
const { loadUserByUserName } = require("./authControler");

    const getLoggedUser=async (req,response)=>{
        const decodedToken = getCredentialFromToken();
        let user = await loadUserByUserName(decodedToken.email);
        let {dataValues}=user
        const {userId}=dataValues;
        const role=dataValues.roles;
        
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
                    seekerId:userId
                },attributes:['name','imageUrl']
            })
        }

        // removing aaray of entry from object
        let { passwordResetToken,expiresIn,password, ...newuser } = user;
        if(userProfile){

            const {name,imageUrl}=userProfile.dataValues; 
            newuser=  newuser.dataValues;
            newuser={...newuser,name,imageUrl};
            newuser.password=null
            response.status(200).json(newuser)
        }else{
            newuser.password=null
            response.status(200).json(newuser)
        }


       
        
    }


module.exports={getLoggedUser};