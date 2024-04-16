const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const asyncErrorHandler = require('../utils/asyncErrorHandler');



const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false,
        freezeTableName: true,
    },
);



const addRole=asyncErrorHandler(async()=> {
    Role.findOrCreate({
        where: { roleId: 501 },
        defaults: { roleName: "ROLE_SEEKER" }
    })
    Role.findOrCreate({
        where: { roleId: 502 },
        defaults: { roleName: "ROLE_EMPLOYEER" }
    })
    
})


module.exports = {Role,addRole}