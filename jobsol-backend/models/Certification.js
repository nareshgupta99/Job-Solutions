const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');
;

const Cerification=sequelize.define("cerification",{
    certificateId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    technology:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

//one to many
// Candidate.hasMany (Cerification);
// Cerification.belongsTo (Candidate);




module.exports=Cerification;