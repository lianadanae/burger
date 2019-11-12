// Set up MySQL connection.
const mysql = require('promise-mysql');


// Export connection for the ORM to use.
module.exports = {
  create: async function() {
    try {
      this.connection = await mysql.createConnection(require('./db-config'));
      console.log('DATABASE CONNECTION ESTABLISHED');
      console.table(this.connection.config);
    } catch (error) {
      console.log('ERROR: DB CONNECTION FAILED');
      console.table(error);
      process.exit(1);
    }
  },
  get: function() {
    return this.connection;
  },
  connection: null,
};
