/* 

Exercise 2 : Relationships

*/

const authors = require('./authors.json');
const research = require('./research.json');

console.log("\n\nExercise 2 : Relationships\n\n");
// import mysql module
let mysql = require("mysql");
const { randomInt } = require("crypto");
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

// delete table
const deleteResearchPaperTable = `
    DROP TABLE IF EXISTS research_paper;
`;
//create research_Paper table
const createResearchPaperTable = `
  CREATE TABLE IF NOT EXISTS research_paper (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(50),
  conference VARCHAR(50),
  published_date DATE
);`;
// delete authorResearch table if exists
const deleteAuthorResearchTable = `
    DROP TABLE IF EXISTS author_research;
`;
// create authorResearch table
const addAuthorResearch = `
CREATE TABLE IF NOT EXISTS author_research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_no INT NOT NULL,
  paper_id INT NOT NULL,
  FOREIGN KEY (author_no) REFERENCES authors(author_no),
  FOREIGN KEY (paper_id) REFERENCES research_paper(paper_id)
);`;

// End of SQL Query

// execute the query
const executeQuery = () => {
  [deleteResearchPaperTable,
  createResearchPaperTable,
  deleteAuthorResearchTable,
  addAuthorResearch,
  ].forEach((query) => {
    connection.query(query, (err) => {
      err && console.log("Error occurred when executing query : " + err);
    });
  });
};

// populate author table
const populateData = () => {
  // i take this data from fikert pull request
  //   author data
  console.log("\n\n Start Populating Authors and Research Paper Table\n\n");
  
  //   insert author data
  authors.forEach((data) => {
    connection.query("INSERT INTO authors SET ?", data, (err) => {
      err && console.log("Error occurred when inserting author data : " + err);
    });
  });
  //   insert research data
  research.forEach((data, index) => {
    connection.query("INSERT INTO research_paper SET ?", data, (err) => {
      err &&
        console.log("Error occurred when inserting research data : " + err);
    });
  });
  // insert author_research data
  for(let i = 1; i <= research.length; i++){ 
    let randomAuthor = randomInt(1, 15);
    let authorResearch = {
      author_no: randomAuthor,
      paper_id: i,
    };
    connection.query("INSERT INTO author_research SET ?", authorResearch, (err) => {
      err &&
        console.log("Error occurred when inserting author_research data : " + err);
    })
  }
  console.log("Data inserted successfully");
};

executeQuery();
populateData();

//close the connection
connection.end((err) => {
  if (err) {
    console.log("Error closing the connection :" + err);
    return;
  }
  console.log("Connection closed");
});
