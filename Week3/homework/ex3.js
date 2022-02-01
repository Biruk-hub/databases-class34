const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
  multipleStatements: true,
});

function getPopulation(Country, Name, Code, cb) {
  // assuming that connection to the database is established and stored as conn
  const query = `SELECT Population FROM ${Country} WHERE Name = '${Name}' and code = '${Code}';`;
  // const query = `SELECT Population FROM Country WHERE Name = 'Ethiopia' and code = 'ETH';`;
  console.log(query);
  conn.query(query, function (err, result) {
    if (err) cb(err);
    if (result.length == 0) cb(new Error("Not found"));
    cb(null, result);
  });
}
function getPopulationSecured(Country, Name, Code, cb) {
  // assuming that connection to the database is established and stored as conn
  const query = `SELECT Population FROM ${Country} WHERE Name = ${conn.escape(
    Name
  )} and code = ${conn.escape(Code)};`;
  console.log(query);
  conn.query(query, function (err, result) {
    if (err) cb(err);
    if (result.length == 0) cb(new Error("Not found"));
    cb(null, result);
  });
}

const queryInjection1 = `Ethiopia';
  Select * from country;
  select name from country where 'A' = 'A`;
const queryInjection2 = `true`;
const name = "Ethiopia";
const code = "ETH";

getPopulation('Country', name, code, (err, result) => {
  if (err) {
      console.log(err);
  } else {
    console.log(
      "<------------------------Population Unsecured with proper data--------------------------->"
    );
      console.log(result);
  }
})

getPopulation('Country', queryInjection1, queryInjection2, (err, result) => {
      if (err) {
          console.log(err);
      } else {
        console.log(
          "<------------------------Population Unsecured with Query Injection--------------------------->"
        );
          console.log(result);
      }
})

getPopulationSecured(
  "Country",
  queryInjection1,
  queryInjection2,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "<------------------------Population Secured with Query Injection--------------------------->"
      );
      console.log(result);
    }
  }
);
getPopulationSecured("Country", name, code, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      "<------------------------Population Secured with Proper Data--------------------------->"
    );
    console.log(result);
  }
});
