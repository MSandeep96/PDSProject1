const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "queenrocks",
  database: "PDSProject1",
  insecureAuth: true,
});

conn.connect();

module.exports = conn;
