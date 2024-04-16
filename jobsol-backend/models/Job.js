const sequelize=require("../config/db");
const Employer = require("./Employer");
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
})

// Employer.belongsToMany(Job);
// Job.belongsTo(Employer);


    
module.exports=Job;