const util = require('util');
const mysql = require('mysql');

const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'bank', // => use your own database name
  };
  
//   account query
  const CREATE_ACCOUNT_TABLE = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance INT
    );`;
//  account_changes query
  const CREATE_ACCOUNT_CHANGES_TABLE = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount INT,
        changed_date DATE,
        remark VARCHAR(255)
    );`;

    async function seedDatabase() {
        //  create a connection
        const connection = mysql.createConnection(CONNECTION_CONFIG);
        // bind and promisify connection.query
        const execQuery = util.promisify(connection.query.bind(connection));
      
        try {
            // create account table
          await execQuery(CREATE_ACCOUNT_TABLE);
            // create account_changes table
          await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);      
          console.log('account and account_changes tables created.');
          connection.end();
        } catch (err) {
          console.error(err.message);
          connection.end();
        }
      }
      
      seedDatabase();