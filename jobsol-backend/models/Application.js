const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');


const Application = sequelize.define('application', {
    ApplicationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ApplicationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ApplicationStatus:{
        type: DataTypes.STRING,
    }
},
{
    timestamps: false,
    freezeTableName: true,
},
);



module.exports = Application;
