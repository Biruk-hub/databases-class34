/* 
    MongoDb simple crud application
*/

const { MongoClient } = require('mongodb');

// Connection URL
// use your own mongodb url
const url = ""
const client = new MongoClient(url);


/*

    Create a new record (document) for a new city (your home town, say)
    Update that record with a new population
    Read the document that you just updated in two ways : finding by the city name, and then by the country code
    Delete the city

*/

// Database Name
const dbName = 'myProject';

async function execQuery(query) {
    // connect to monogo db
    await client.connect();
    console.log('Connected successfully to server');
    // use the database
    const db = client.db()
}

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());