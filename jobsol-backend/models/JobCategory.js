const sequelize = require("../config/db");
const JobCategory = sequelize.define('JobCategory', {
   
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports=JobCategory