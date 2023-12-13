// Import the express package/module
// that let us start up a web server
import express from 'express';

// Import the database driver
import mysql from 'mysql2/promise';

// Create a web server named app
const app = express();

// Serve all files in the folder client
app.use(express.static('Music-Metadata'));

// Start the server on a certain port
// and write to the terminal which port...
app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));



// Create a connection 'db' to the database
const db = await mysql.createConnection({
    host: '161.97.144.27',
  port: '8093',
  user: 'root',
  password: 'guessagain93',
  database: 'MetaHub'
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}


// Create a REST-api route
// When somebody asks for http://localhost:3000/api/cats
// send som JSON based on a database query
app.get('/api/Musics', async (request, response) => {
  // Make a database query and remember the result
  let result = await query(`
    SELECT *
    FROM Musics
  `);
  // Send a response to the client
  response.json(result);
});

// A search route to find a cat by parts of its name
// or parts of its description
app.get('/api/Musics/:searchTerm', async (request, response) => {
  // Get the search term from as a parameter from the route/url
  let searchTerm = request.params.searchTerm;
  // Make a database query and remember the result
  // using the search term
  let result = await query(`
    SELECT *
    FROM Musics
    WHERE 
      LOWER(CONCAT(musicName, ' ', meta->'$.musicDescription')) 
      LIKE LOWER(?)
  `, ['%' + searchTerm + '%']);
  // Send a response to the client
  response.json(result);
});