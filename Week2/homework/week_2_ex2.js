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

//create research_Paper table
const createResearchPaperTable = `
CREATE TABLE IF NOT EXISTS research_paper (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        published_date DATE,
        author_no INT NOT NULL,
        FOREIGN KEY (author_no) REFERENCES authors(author_no)
        );`;
// delete table
const deleteResearchPaperTable = `
    DROP TABLE IF EXISTS research_paper;
`;
//add research_paper to author table
const addResearchPaperColumn = `
ALTER TABLE authors ADD research_paper  INT;
`;
// assign research_paper to research_paper table
const assignResearchPaper = `
ALTER TABLE authors ADD FOREIGN KEY (research_paper) REFERENCES research_paper(paper_id);`;

// End of SQL Query

// execute the query
const executeQuery = () => {
  [deleteResearchPaperTable,
  createResearchPaperTable,
  addResearchPaperColumn,
  assignResearchPaper,
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

  for (let i = 1; i <= 15; i++) {
    let randomNumber = randomInt(1, 30);
    const updateQuery = `UPDATE authors SET  research_paper = ${randomNumber} WHERE author_no = '${i}'`;
    connection.query(updateQuery, (err) => {
      err &&
        console.log("Error occurred when updating research_paper : " + err);
    });
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
