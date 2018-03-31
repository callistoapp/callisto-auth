const mysql = require("mysql");
const mysqlConfig = require("../../config").mysql;

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: mysqlConfig.password,
  database: 'auth'
})
module.exports = connection;


