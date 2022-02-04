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
SELECT research_paper.paper_title, COUNT(author_research.author_no) AS authors_count
FROM research_paper
JOIN author_research
ON author_research.paper_id = research_paper.paper_id
GROUP BY research_paper.paper_title;`;

const getSumOfResearchPaperPublishedByFemaleAuthors = `
SELECT COUNT(*) AS ResearchDoneByFemales
FROM author_research
JOIN authors ON author_research.author_no = authors.author_no
WHERE authors.gender = 'F';`;

const averageH_IndexOfAllUniversity = `
SELECT authors.university, AVG(authors.h_index) AS average_h_index
FROM authors 
GROUP BY authors.university;
`;

const sumOfResearchPaperOfAuthorsPerUniversity = `
SELECT authors.university, COUNT(research_paper.paper_title) AS sum_of_research_papers
FROM author_research
JOIN authors ON author_research.author_no = authors.author_no
JOIN research_paper ON research_paper.paper_id = author_research.paper_id
GROUP BY authors.university;
`;

const minAndMaxOfH_IndexOfAllUniversity = `
SELECT authors.university, MIN(authors.h_index) AS min_h_index, MAX(authors.h_index) AS max_h_index
FROM author_research
JOIN authors ON author_research.author_no = authors.author_no
JOIN research_paper ON research_paper.paper_id = author_research.paper_id
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
