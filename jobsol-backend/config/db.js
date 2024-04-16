const { Sequelize } = require('sequelize');
const dotenv=require('dotenv');
dotenv.config();
// const mysql = require('mysql2/promise');

// // create the connection to database
// const mysqlpool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password:process.env.DB_PSWD,
//   database:process.env.DB_NAME,
//   waitForConnections: true,
//   timezone: '+00:00',
// });

// console.log("in db")

// module.exports=mysqlpool;

const sequelize = new Sequelize(process.env.DB_NAME_TEST, process.env.DB_USER, process.env.DB_PSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT ,
  }
);


  module.exports=sequelize;
