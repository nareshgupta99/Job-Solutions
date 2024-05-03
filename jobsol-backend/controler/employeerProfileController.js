const asyncErrorHandler = require("../utils/asyncErrorHandler")
const { getCredentialFromToken } = require("../utils/Auth");
const { loadUserByUserName } = require("./authControler");
const EmployerProfile=require("../models/EmployerProfile");

const createEmployeerProfile=asyncErrorHandler(async (req,res)=>{
    const decodedToken = getCredentialFromToken();
    const employeer = await loadUserByUserName(decodedToken.email);
    const data=req.body;
    console.log(data)
    const savedEmployeer=await EmployerProfile.findOne({where:{
        UserID:employeer.userId
    }})
    if(!savedEmployeer){
      const resEmployeer= await EmployerProfile.create(data);
      resEmployeer.setUser(employeer);

    }else{
        savedEmployeer.companyName=data.companyName;
        savedEmployeer.designation=data.designation;
        savedEmployeer.NoOfEmployee=data.noOfEmployee;
        savedEmployeer.setUser(employeer)
        await savedEmployeer.save();
    }

    res.status(200).json({
        message:"profile updated",
        success:true

    })
    
})

const getEmployeerProfile=asyncErrorHandler(async(req,res,next)=>{
    const decodedToken = getCredentialFromToken();
    const employeer = await loadUserByUserName(decodedToken.email);
    let savedEmployeer=await EmployerProfile.findOne({where:{
        UserID:employeer.userId
    }})
    let data;
    if(savedEmployeer){
        const {dataValues}=savedEmployeer
        delete dataValues.UserID
        data=dataValues
        data={...data,email:employeer.email}
        console.log(data)
    }
    res.status(200).json({
        ...data,
        success:true

    })
})

module.exports={createEmployeerProfile,getEmployeerProfile};