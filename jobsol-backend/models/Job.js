const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const Job=sequelize.define("job",{
    jobId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    experienceRequired:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profileName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobDescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sallery:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    noOfOpenning:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    workMode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roleDetails:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: true,
    freezeTableName: true,
}
)






    
module.exports=Job;