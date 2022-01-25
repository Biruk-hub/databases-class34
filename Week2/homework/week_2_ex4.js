/* 

Exercise 4 : Aggregate Functions


*/

console.log("\n\nExercise 4 : Aggregate Functions\n\n");
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

// SQL Query
const getAllResearchPapers = ` 
SELECT research_paper.paper_title, COUNT(authors.author_no) as authors_count
FROM research_paper
JOIN authors
ON authors.research_paper = research_paper.paper_id
GROUP BY research_paper.paper_title;`;

const getSumOfResearchPaperPublishedByFemaleAuthors = `
SELECT COUNT(*) AS ResearchDoneByFemales
FROM research_paper
WHERE paper_id IN (
    SELECT research_paper 
    FROM authors
    WHERE gender = 'F'
);`;

const averageH_IndexOfAllUniversity = `
SELECT authors.university, AVG(authors.h_index) as average_h_index
FROM authors 
JOIN authors as mentor 
ON mentor.author_no = authors.author_no
GROUP BY authors.university;
`;

const sumOfResearchPaperOfAuthorsPerUniversity = `
SELECT authors.university, COUNT(research_paper.paper_title) as sum_of_research_papers
FROM authors
JOIN research_paper
ON research_paper.paper_id = authors.research_paper
GROUP BY authors.university;
`;

const minAndMaxOfH_IndexOfAllUniversity = `
SELECT authors.university, MIN(authors.h_index) as min_h_index, MAX(authors.h_index) as max_h_index
FROM authors
JOIN authors as mentor
ON mentor.author_no = authors.author_no
GROUP BY authors.university;
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


[
  getAllResearchPapers,
  getSumOfResearchPaperPublishedByFemaleAuthors,
  averageH_IndexOfAllUniversity,
  sumOfResearchPaperOfAuthorsPerUniversity,
  minAndMaxOfH_IndexOfAllUniversity,
].forEach((query) => {
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
