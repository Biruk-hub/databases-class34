// import mysql module
let mysql = require('mysql');

// create connection to database
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

// sql query

// 1) What are the names of countries with population greater than 8 million?
const ex1 = `select name from country where population > 8000000;`
// 2) What are the names of countries that have “land” in their names?
const ex2 = `select name from country where name like '%land%';`
// 3) What are the names of the cities with population in between 500,000 and 1 million?
const ex3 = `select name from city where population between 500000 and 1000000;`
// 4) What's the name of all the countries on the continent ‘Europe’?
const ex4 = `select name from country where continent = 'Europe';`
// 5) List all the countries in the descending order of their surface areas.
const ex5 = `select name from country order by surfaceArea desc;`
// 6) What are the names of all the cities in the Netherlands?
const ex6 = `select name from city where countryCode like 'NL%';`
// 7) What is the population of Rotterdam?
const ex7 = `select population from city where name = 'Rotterdam';`
// 8) What's the top 10 countries by Surface Area?
const ex8 = `select name from country order by surfaceArea desc limit 10;`
// 9) What's the top 10 most populated cities?
const ex9 = `select name from city order by population desc limit 10;`
// 10) What is the population number of the world?
const ex10 = `select sum(population) as populationOfTheWorld from country;`

// open connection
connection.connect();

// execute query
function executeQuery(query) {
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
        }
    })
}

// call function
executeQuery(ex1);
executeQuery(ex2);
executeQuery(ex3);
executeQuery(ex4);
executeQuery(ex5);
executeQuery(ex6);
executeQuery(ex7);
executeQuery(ex8);
executeQuery(ex9);
executeQuery(ex10);

// end connection
connection.end();