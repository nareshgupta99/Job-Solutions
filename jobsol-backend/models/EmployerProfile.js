const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const EmployerProfile=sequelize.define("employerProfile",{
    employeerId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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