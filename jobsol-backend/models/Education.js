const sequelize=require("../config/db");


const Education=sequelize.define("education",{
    education:{
        type:DataTypes.STRING,
        allowNull:false
    },
    insitutaionName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    educationMode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    startDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    endDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
   Grading:{
    type:DataTypes.Integer,
    
   },
   Marks:{
    type:DataTypes.Integer,
   }
})





module.exports=Education;