// Helper function for generating SQL syntax.

function printQuestionMarks(num) {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    const arr = [];
  
    // Loop through the keys and push the key/value as a string into arr
    for (const key in ob) {
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        let value = ob[key];
        // if string with spaces, add quotations 
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        arr.push(key + '=' + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  // Object for all our SQL statement functions.
  const orm = {
  // Function that returns all table entries
    selectAll: function(tableInput, cb) {
      const queryString = 'SELECT * FROM ' + tableInput + ';';
  // Perform the database query
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

  // Function that inserts a table entry
    insertOne: function(table, cols, vals, cb) {
      let queryString = 'INSERT INTO ' + table;
  
      queryString += ' (';
      queryString += cols.toString();
      queryString += ') ';
      queryString += 'VALUES (';
      queryString += printQuestionMarks(vals.length);
      queryString += ') ';
  
      console.log(queryString);
  //Perform the database query
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // Function that updates a single table entry
    updateOne: function(table, objColVals, condition, cb) {
      let queryString = 'UPDATE ' + table;
  
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;
  
      console.log(queryString);
      // Performs the database query
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  };
  
  // Export the orm object 
  module.exports = orm;
  