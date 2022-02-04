/* 

Exercise 1 : Keys

*/
console.log("\n\nExercise 1 : Keys\n\n");
// import mysql module
let mysql = require("mysql");
// create the database connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// open the connection
connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db :" + err);
    return;
  }
  console.log("Connection established");
});

//SQL Query


// create database
const createDatabase = "CREATE DATABASE IF NOT EXISTS artists";
// delete database
const deleteDatabase = "DROP DATABASE IF EXISTS artists";
// use database
const useDatabase = "USE artists";

// delete table
const deleteAuthorsTable = `
    DROP TABLE IF EXISTS authors;
`;
//create table
const createAuthorsTable = `
CREATE TABLE IF NOT EXISTS authors (
     author_no INT AUTO_INCREMENT PRIMARY KEY,
     author_name VARCHAR(50),
     university VARCHAR(50),
     date_of_birth DATE,
     h_index INT,
     gender ENUM ('M', 'F')
     );`;
//add mentor to table
const addMentorColumn = `
ALTER TABLE authors ADD mentor INT;
`;
//assign mentor to author
const assignMentor = `ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);`;


// End of SQL Query


// execute the query

const executeQuery = () => {
  // create database
  [deleteDatabase,
    createDatabase,
    useDatabase,
    deleteAuthorsTable,
    createAuthorsTable,
    addMentorColumn,
    assignMentor
  ].forEach((query) => { 
    connection.query(query, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });

}

// call the function
executeQuery();

//close the connection
connection.end((err) => {
  if (err) {
    console.log("Error closing the connection :" + err);
    return;
  }
  console.log("Connection closed");
});