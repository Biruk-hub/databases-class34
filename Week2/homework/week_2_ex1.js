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
// delete table
const deleteAuthorsTable = `
    DROP TABLE IF EXISTS authors;
`;
//add mentor to table
const addMentorColumn = `
ALTER TABLE authors ADD mentor INT;
`;
//assign mentor to author
const assignMentor = `ALTER TABLE authors ADD FOREIGN KEY (mentor) REFERENCES authors(author_no);`;


// End of SQL Query


// execute the query

// delete database
connection.query(deleteDatabase, (error) => {
    error
    ? console.log("Error occurred while deleting the database : " + error)
    : console.log("Database deleted successfully");
});

// create database
connection.query(createDatabase, (error) => {
  error
    ? console.log("Error occurred while creating the database : " + error)
    : console.log("Database created successfully");
});
// use artist database
connection.changeUser({ database: "artists" }, (error) => {
  error
    ? console.log("Error occurred while using database : " + error)
    : console.log("Database changed successfully");
});
// delete authors table if exists
connection.query(deleteAuthorsTable, (error) => {
  error
    ? console.log("Error occurred while deleting author table : " + error)
    : console.log("Table dropped successfully");
});
// create authors table
connection.query(createAuthorsTable, (error) => {
  error
    ? console.log("Error occurred while creating authors table : " + error)
    : console.log("Table Authors created successfully");
});
// add mentor column
connection.query(addMentorColumn, (error) => {
  error
    ? console.log(
        "Error occurred while adding mentor column in artist table : " + error
      )
    : console.log("Column added successfully");
});
// assign mentor to author
connection.query(assignMentor, (error) => {
    error
        ? console.log('Error occurred while assigning mentor to author : ' + error)
        : console.log('Mentor assigned successfully');
});

//close the connection
connection.end((err) => {
  if (err) {
    console.log("Error closing the connection :" + err);
    return;
  }
  console.log("Connection closed");
});