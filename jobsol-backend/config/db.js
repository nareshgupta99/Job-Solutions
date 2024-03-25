const mysql = require('mysql2/promise');

// create the connection to database
const mysqlpool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'root',
  database: 'jobsol',
  waitForConnections: true
});

console.log("in db")

module.exports=mysqlpool;