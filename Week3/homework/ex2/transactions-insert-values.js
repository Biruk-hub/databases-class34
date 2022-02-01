const util = require("util");
const fs = require("fs");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank", // => use your own database name
};

async function seedDatabase() {
  //   create a connection
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  // promisify readFile
  const readFile = util.promisify(fs.readFile);
  // bind and promisify connection.query
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    //  read data from account.json file
    const data = await readFile(__dirname + "/account.json", "utf8");
    //  parse data to JSON
    const accounts = JSON.parse(data);
    // insert query
    const INSERT = `INSERT INTO account SET ?`;
    // populate account table
    const promises = accounts.map((account) => execQuery(INSERT, account));    
    await Promise.all(promises);
    console.log("data inserted into account table");
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

seedDatabase();
