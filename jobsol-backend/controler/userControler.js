const mysqlpool = require("../config/db")

const getAllUser=async (req,res)=>{
    const data=await mysqlpool.query("select * from user");
    if(data){
        try{
            console.log("in try block")
            console.log(data)
            res.status(200).send({
                success:true,
                data:data[0]
            })
        }catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message:"error in gettin all students",
                error:err
            })
        }
    }



    
}

const createUser=(req,res)=>{
    const {email,password}=req.body;
    const enabled=true;
    console.log(req.body)
    const data=mysqlpool.query("insert into user(email,password,enabled)value(?,?,?)",[email,password,enabled])
    if(data){
        try{
            console.log(data)
            res.status(201).send({
                message:"succeessfully created"
            })
        }catch(err){
            crossOriginIsolated.log(err)
            res.status(500).send({error:err})
        }
    }

}


module.exports={getAllUser,createUser}