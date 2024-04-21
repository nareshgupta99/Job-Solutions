const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Category = sequelize.define("category", {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
}, {
    timestamps: false,
    freezeTableName: true,
}

)

module.exports=Category;
