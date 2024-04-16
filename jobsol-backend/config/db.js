const { Sequelize } = require('sequelize');
const dotenv=require('dotenv');
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME_TEST, process.env.DB_USER, process.env.DB_PSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT ,
  }
);


  module.exports=sequelize;
