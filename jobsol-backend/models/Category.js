const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Category = sequelize.define("category", {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    catgoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
}

)

module.exports=Category







module.exports = Job;