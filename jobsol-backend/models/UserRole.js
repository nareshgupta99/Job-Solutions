const sequelize = require("../config/db");
const UserRole = sequelize.define('UserRole', {
   
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports=UserRole