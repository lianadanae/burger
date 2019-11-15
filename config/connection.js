// Require dependencies
const mysql = require('mysql');

// Set up MySQL connection
let connection;

if (process.env.JAWSDB_URL) {
  // JawsDB on Heroku
connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'ChowDa2019!',
    database: 'burgers_db'
  })
};

// Make connection to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Export connection for the ORM to use
module.exports = connection;
