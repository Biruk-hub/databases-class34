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
SELECT authors.author_name, mentor.author_name AS mentor
FROM authors
JOIN authors AS mentor
ON mentor.author_no = authors.mentor;
`;
const getAuthorsWithoutResearchPaper = `
SELECT authors.*, research_paper.paper_title
FROM author_research
JOIN authors ON author_research.author_no = authors.author_no
JOIN research_paper ON research_paper.paper_id = author_research.paper_id;
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
