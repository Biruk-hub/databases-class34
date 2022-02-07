/* 
    MongoDb simple crud application
*/

const { MongoClient } = require("mongodb");

// Connection URL
// use your own mongodb url
const url =
  "mongodb+srv://mango:biruketblem@cluster0.xbtfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

const newCity = {
  city_id: 212121,
  name: "Addis Ababa",
  country_code: "ETH",
  district: "Addis Ketema",
  population: 3000000,
};

/*

    Create a new record (document) for a new city (your home town, say)
    Update that record with a new population
    Read the document that you just updated in two ways : finding by the city name, and then by the country code
    Delete the city
*/



async function insertCity() {
  // connect to monogo db
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("world");
  const collection = db.collection("city");
  console.log('inserting city...');
  // insert a document
  collection.insertOne(newCity, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('city inserted successfully');
  });
}

async function updatePopulation() {
  // connect to monogo db
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("world");
  const collection = db.collection("city");
  console.log('updating population...');
  // update a document
  collection.updateOne(
    { city_id: 212121 },
    { $set: { population: 4000000 } },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result.modifiedCount);
      console.log('population updated successfully');
      return;
    }
  );
}

async function readDocumentByCityName() {
  // connect to monogo db
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("world");
  const collection = db.collection("city");
  console.log('reading document by city name...');
  // find a document
  collection.findOne({ name: "Addis Ababa"}, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('document found successfully');
    return;
  });
}

async function readDocumentByCountryCode() {
  // connect to monogo db
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("world");
  const collection = db.collection("city");
  console.log('reading document by country code...');
  // find a document
  collection.findOne({ country_code: "ETH", city_id: 212121 }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    console.log('document found successfully');
    return;
  });
}

async function deleteDocumentById() {
  // connect to monogo db
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db("world");
  const collection = db.collection("city");
  console.log('deleting document by id...');
  // delete a document
  collection.deleteOne({ city_id: 212121 }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result.deletedCount);
    console.log('document deleted successfully');
    return;
  });
}

// you can run all the functions one by one

// insertCity();
// updatePopulation();
// readDocumentByCityName();
// readDocumentByCountryCode();
// deleteDocumentById();

  // promisees chain
  insertCity().then(updatePopulation).then(readDocumentByCityName).then(readDocumentByCountryCode).then(deleteDocumentById).then(() => client.close());