/* 

Exercise 3 : Joins

*/

console.log("\n\nExercise 3 : Joins\n\n");
// import mysql module
let mysql = require("mysql");
// create the database connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "artists",
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
const getAuthorsWithMentor = `
SELECT authors.author_name, authors.university, authors.date_of_birth, authors.h_index, authors.gender, authors.research_paper, mentor.author_name as mentor 
FROM authors 
JOIN authors as mentor 
ON mentor.author_no = authors.author_no;
`;
const getAuthorsWithoutResearchPaper = `
SELECT authors.*, research_paper.paper_title as paper_title
FROM authors 
LEFT JOIN research_paper 
ON research_paper.paper_id = authors.research_paper;
`;
// execute the query
const executeQuery = (query) => {
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Error in query");
      return;
    }
    console.log("Query executed successfully");
    console.log(rows);
  });
};

[getAuthorsWithMentor, getAuthorsWithoutResearchPaper].forEach((query) => {
  executeQuery(query);
});

//close the connection
connection.end((err) => {
  if (err) {
    console.log("Error closing the connection :" + err);
    return;
  }
  console.log("Connection closed");
});
