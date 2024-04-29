const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");



const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    passwordResetToken: {
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