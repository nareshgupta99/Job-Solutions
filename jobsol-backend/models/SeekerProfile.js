const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const SeekerProfile=sequelize.define("sekker",{
    seekerId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dob:{
        type:DataTypes.DATE
    },
    contactNumber:{
        type:DataTypes.STRING
    },
    about:{
        type:DataTypes.STRING
    },
    expectedSallery:{
        type:DataTypes.INTEGER
    },resume:{
        type:DataTypes.STRING
    },pic:{
        type:DataTypes.STRING
    }
    
});




module.exports=SeekerProfile;