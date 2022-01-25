/* 

Exercise 2 : Relationships

*/
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

// delete research_paper table
connection.query(deleteResearchPaperTable, (error) => {
  error
    ? console.log(
        "Error occurred while deleting research_paper table : " + error
      )
    : console.log("research_paper table deleted");
});

// create research_paper table
connection.query(createResearchPaperTable, (error) => {
  error
    ? console.log(
        "Error occurred while creating research_paper table : " + error
      )
    : console.log("research_paper table created");
});

// add research_paper column to author table
connection.query(addResearchPaperColumn, (error) => {
  error
    ? console.log(
        "Error occurred while adding research_paper column to author table : " +
          error
      )
    : console.log("research_paper column added to author table");
});

// assign relationship research_paper to research_paper table
connection.query(assignResearchPaper, (error) => {
  error
    ? console.log(
        "Error occurred while assigning relationship research_paper to research_paper table" +
          error
      )
    : console.log(
        "relationship research_paper assigned to research_paper table"
      );
});

// populate author table
const populateData = () => {
  // i take this data from fikert pull request
  //   author data
  console.log("\n\n Start Populating Authors and Research Paper Table\n\n");
  const authorData = [
    {
      author_name: "Wouter",
      university: "MIT",
      date_of_birth: "1967-01-01",
      h_index: 4,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Jane",
      university: "Cambridge",
      date_of_birth: "1977-01-01",
      h_index: 5,
      gender: "f",
      mentor: 2,
    },
    {
      author_name: "Lydia",
      university: "Groningen",
      date_of_birth: "1985-03-01",
      h_index: 6,
      gender: "f",
      mentor: 1,
    },
    {
      author_name: "Claudia",
      university: "Amsterdam",
      date_of_birth: "1987-06-01",
      h_index: 5,
      gender: "f",
      mentor: 1,
    },
    {
      author_name: "Obada",
      university: "El-Ehzer",
      date_of_birth: "1988-07-11",
      h_index: 7,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Fikret",
      university: "Maastricht",
      date_of_birth: "1990-07-11",
      h_index: 4,
      gender: "m",
      mentor: 5,
    },
    {
      author_name: "Esranur",
      university: "Oxford",
      date_of_birth: "1988-09-11",
      h_index: 4,
      gender: "f",
      mentor: 5,
    },
    {
      author_name: "Amar",
      university: "El-Ehzer",
      date_of_birth: "1990-07-11",
      h_index: 3,
      gender: "m",
      mentor: 2,
    },
    {
      author_name: "Bachar",
      university: "Mexico",
      date_of_birth: "1984-08-11",
      h_index: 7,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Mustafa",
      university: "Amsterdam",
      date_of_birth: "1992-09-11",
      h_index: 4,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Emine",
      university: "Malatya",
      date_of_birth: "1992-01-11",
      h_index: 5,
      gender: "f",
      mentor: 5,
    },
    {
      author_name: "Sadek",
      university: "Utrecht",
      date_of_birth: "1988-02-22",
      h_index: 3,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Reshadi",
      university: "Cambridge",
      date_of_birth: "1988-04-21",
      h_index: 6,
      gender: "m",
      mentor: 5,
    },
    {
      author_name: "George",
      university: "Amsterdam",
      date_of_birth: "1989-07-11",
      h_index: 5,
      gender: "m",
      mentor: 7,
    },
    {
      author_name: "Marsel",
      university: "MIT",
      date_of_birth: "1978-07-11",
      h_index: 8,
      gender: "m",
      mentor: 3,
    },
  ];
  //   insert author data
  authorData.forEach((data) => {
    connection.query("INSERT INTO authors SET ?", data, (err) => {
      err && console.log("Error occurred when inserting author data : " + err);
    });
  });

  const researchData = [
    {
      paper_title: "Javascript",
      conference: "Central Academy",
      published_date: "2000-01-01",
      author_no: 1,
    },
    {
      paper_title: "Node JS",
      conference: "HYF Academy",
      published_date: "2000-02-01",
      author_no: 8,
    },
    {
      paper_title: "Javascript",
      conference: "HYF Academy",
      published_date: "2000-03-01",
      author_no: 2,
    },
    {
      paper_title: "Angular JS",
      conference: "Cambridge Academy",
      published_date: "2000-04-01",
      author_no: 2,
    },
    {
      paper_title: "Vue JS",
      conference: "HYF Academy",
      published_date: "2002-02-01",
      author_no: 3,
    },
    {
      paper_title: "Node JS",
      conference: "HYF Academy",
      published_date: "2000-02-01",
      author_no: 3,
    },
    {
      paper_title: "React JS",
      conference: "MIT Academy",
      published_date: "1995-02-01",
      author_no: 1,
    },
    {
      paper_title: "HTML",
      conference: "HYF Academy",
      published_date: "2000-02-01",
      author_no: 7,
    },
    {
      paper_title: "HTML",
      conference: "Cambridge Academy",
      published_date: "2000-08-01",
      author_no: 6,
    },
    {
      paper_title: "CSS",
      conference: "EL-Ehzer Academy",
      published_date: "2002-02-01",
      author_no: 6,
    },
    {
      paper_title: "Tailwind",
      conference: "HYF Academy",
      published_date: "2005-02-01",
      author_no: 1,
    },
    {
      paper_title: "Bootstrap 4.1",
      conference: "Inonu Academy",
      published_date: "2004-02-01",
      author_no: 13,
    },
    {
      paper_title: "Node JS",
      conference: "Amsterdam Academy",
      published_date: "2006-02-01",
      author_no: 1,
    },
    {
      paper_title: "SQL and MYSQL",
      conference: "Groningen Academy",
      published_date: "2008-02-01",
      author_no: 14,
    },
    {
      paper_title: "Mongoose",
      conference: "Utrecht Academy",
      published_date: "2006-02-01",
      author_no: 5,
    },
    {
      paper_title: "Next JS",
      conference: "HYF Academy",
      published_date: "2005-02-01",
      author_no: 12,
    },
    {
      paper_title: "TypeScript",
      conference: "Maastricht Academy",
      published_date: "2008-02-01",
      author_no: 3,
    },
    {
      paper_title: "Angular JS",
      conference: "Maastricht Academy",
      published_date: "2007-02-01",
      author_no: 3,
    },
    {
      paper_title: "API and Browser",
      conference: "HYF Academy",
      published_date: "2004-02-01",
      author_no: 14,
    },
    {
      paper_title: "Vue JS",
      conference: "Amsterdam Academy",
      published_date: "2009-05-01",
      author_no: 1,
    },
    {
      paper_title: "React Native JS",
      conference: "Groningen Academy",
      published_date: "2009-09-09",
      author_no: 9,
    },
    {
      paper_title: "Node JS",
      conference: "HYF Academy",
      published_date: "2000-02-01",
      author_no: 2,
    },
    {
      paper_title: "GraphQL ",
      conference: "Inonu Academy",
      published_date: "2009-06-01",
      author_no: 4,
    },
    {
      paper_title: "Python",
      conference: "Cambridge Academy",
      published_date: "2000-12-01",
      author_no: 12,
    },
    {
      paper_title: "Django",
      conference: "HYF Academy",
      published_date: "2012-02-01",
      author_no: 13,
    },
    {
      paper_title: "SQLite",
      conference: "Groningen Academy",
      published_date: "2014-02-01",
      author_no: 14,
    },
    {
      paper_title: "Java",
      conference: "HYF Academy",
      published_date: "2012-02-01",
      author_no: 4,
    },
    {
      paper_title: "PHP",
      conference: "HYF Academy",
      published_date: "2015-02-01",
      author_no: 5,
    },
    {
      paper_title: "Go",
      conference: "Inonu Academy",
      published_date: "2019-02-01",
      author_no: 9,
    },
    {
      paper_title: "Typescript",
      conference: "Oxford Academy",
      published_date: "2004-02-01",
      author_no: 14,
    },
  ];
  //   insert research data
  researchData.forEach((data, index) => {
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

populateData();

//close the connection
connection.end((err) => {
  if (err) {
    console.log("Error closing the connection :" + err);
    return;
  }
  console.log("Connection closed");
});
