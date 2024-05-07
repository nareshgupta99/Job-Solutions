const sequelize=require("../config/db");
const { DataTypes } = require('sequelize');

const SeekerProfile=sequelize.define("seekerProfile",{
    seekerId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
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
    },resumeUrl:{
        type:DataTypes.STRING
    },imageUrl:{
        type:DataTypes.STRING
    },resumePublicId:{
        type:DataTypes.STRING
    },imagePublicId:{
        type:DataTypes.STRING
    },
    currentLocation:{
        type:DataTypes.STRING
    }
    
});



module.exports=SeekerProfile;