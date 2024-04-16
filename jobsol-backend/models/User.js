const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");



const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        unique: true
    },expiresIn:{
        type:DataTypes.DATE
    }

},
    {
        timestamps: false,
        freezeTableName: true,
    },
);






module.exports = User