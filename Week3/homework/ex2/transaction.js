const util = require("util");
const fs = require("fs");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "bank", // => use your own database name
};
const UPDATE_ACCOUNT_1 = `
  UPDATE account SET balance = balance - 1000 WHERE account_number = 101;`;
const INSERT_CHANGE_1 = `INSERT INTO account_changes (account_number, amount, changed_date, remark) values (101, 1000, '2021-01-01', 'Transfer to account 102');`;

const UPDATE_ACCOUNT_2 = `
  UPDATE account SET balance = balance + 1000 WHERE account_number = 102;`;
const INSERT_CHANGE_2 = `INSERT INTO account_changes (account_number, amount, changed_date, remark) values (102, 1000, '2021-01-01', 'Receive from account 101');`;

async function seedDatabase() {
  //   create a connection
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  // bind and promisify connection.query
  const execQuery = util.promisify(connection.query.bind(connection));
  const START_TRANSACTION = `START TRANSACTION;`;
  const COMMIT = `COMMIT;`;
  const ROLLBACK = `ROLLBACK;`;

  //   start the transaction
  await execQuery(START_TRANSACTION);

  try {
    console.log("start transaction");
    await execQuery(UPDATE_ACCOUNT_1);
    await execQuery(INSERT_CHANGE_1);
    await execQuery(UPDATE_ACCOUNT_2);
    await execQuery(INSERT_CHANGE_2);
    console.log("transaction completed");
    await execQuery(COMMIT);
    connection.end();
  } catch (err) {
    console.error(err.message);
    await execQuery(ROLLBACK);
    connection.end();
  }
}

seedDatabase();
