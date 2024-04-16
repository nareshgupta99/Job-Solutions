const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const EmployerProfile=sequelize.define("employerProfile",{
    employeerId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email:{
        type:DataTypes.STRING,
        allowedNull:false
    },
    employeerId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    companyName:{
        type:DataTypes.STRING,
        allowedNull:false
    },
    designation:{
        type:DataTypes.STRING,
        allowedNull:false
    },
    NoOfEmployee:{
        type:DataTypes.INTEGER,
        allowedNull:false
    }
});






module.exports=EmployerProfile;