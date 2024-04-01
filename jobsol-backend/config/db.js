// const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dotenv=require('dotenv');
dotenv.config();

// create the connection to database
const mysqlpool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PSWD,
  database:process.env.DB_NAME,
  waitForConnections: true
});

console.log("in db")

module.exports=mysqlpool;

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PSWD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

// module.exports=sequelize;