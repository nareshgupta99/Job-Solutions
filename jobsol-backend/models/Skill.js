const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const Skill=sequelize.define("skill",{
    skillId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    skillName:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
});





module.exports=Skill;
