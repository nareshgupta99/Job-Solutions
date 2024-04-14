const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dotenv=require('dotenv');
dotenv.config();

// create the connection to database
const mysqlpool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PSWD,
  database:process.env.DB_NAME,
  waitForConnections: true,
  timezone: '+00:00',
});

console.log("in db")

module.exports=mysqlpool;

