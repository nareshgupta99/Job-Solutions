const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const Job=sequelize.define("job",{
    jobId:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    experienceRequired:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    jobType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profile:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sallery:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps: false,
    freezeTableName: true,
}

)






    
module.exports=Job;