import fs from 'fs';
import mysql from 'mysql2/promise';

async function insertDataIntoDatabase(data) {
  // Create a MySQL connection pool
  // waitForConnections: true:When this is set to true, the pool will automatically queue the query and wait for an available connection if the connection limit has been reached. If set to false, the query will be executed immediately, and an error will be thrown if no connections are available.
// connectionLimit: 10: This sets the maximum number of connections to be created at once in the pool. In this case, the limit is set to 10 concurrent connections.
// queueLimit: 0: This determines the maximum number of queries that can be queued while waiting for a connection to become available. Setting it to 0 means that there is no limit to the number of queued queries.
  
const connection = await mysql.createPool({
  host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  });

  try {
    for (let powerpointMetadata of data) {
      let fileName = powerpointMetadata.digest + '.ppt';

      delete powerpointMetadata.digest;

      delete powerpointMetadata.sha256;
      delete powerpointMetadata.sha512;

      // Log things to see that we have the correct filename and metadata
      console.log('');
      console.log(fileName);
      console.log(powerpointMetadata);

      // Insert data into the MySQL database
      await connection.query('INSERT INTO PowerPoints (pptName, pptDescription) VALUES (?, ?)', [fileName, JSON.stringify(powerpointMetadata)]);
    }
  } catch (error) {
    console.error('Error inserting data into the database:', error.message);
  } finally {
    // Close the MySQL connection pool
    await connection.end();
  }
}

// Read the json string from file
let json = fs.readFileSync('./csvTojson/csvjson.json', 'utf-8');

// Convert from a string to a real data structure
let data = JSON.parse(json);

// Call the function to insert data into the database
insertDataIntoDatabase(data);
