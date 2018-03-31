import mysql from 'mysql'
import {mysqlConfig} from '../../config'

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: mysqlConfig.password,
  database: 'auth'
})
module.exports = connection;


