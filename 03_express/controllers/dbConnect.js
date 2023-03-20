const mysql = require('mysql'); // mysql

// connection 생성 및 mysql 정보
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: '3306',
  database: process.env.MYSQL_DB,
});
connection.connect();

module.exports = connection;
