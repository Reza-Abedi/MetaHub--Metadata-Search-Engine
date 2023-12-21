// Import the express package/module
// that lets us start up a web server
import express from 'express';

// Import the database driver
import mysql from 'mysql2/promise';

// Create a web server named app
const app = express();

// Serve all files in the folder client
app.use(express.static('client'));

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

// A search route to find music
app.get('/api/music/:searchTerm/:searchType/:durationSearch', async (request, response) => {
  // Get the search term from a parameter from the route/url
  let searchTerm = request.params.searchTerm;
  // Get the search type as a parameter from the route/url
  let searchType = request.params.searchType;
  // Get the duration search as a parameter from the route/url
  let durationSearch = request.params.durationSearch;

  // Construct the SQL query based on the search type and duration search
  let sql = `
    SELECT *
    FROM Musics
    WHERE LOWER(musicDescription -> '$.common.${searchType}') LIKE LOWER (?)
      AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2))
      ${durationSearch === 'greaterThanOrEqual' ? '>=' : '<'} ?
  `;

  // If searching for all, adjust the query accordingly
  if (searchType == 'all') {
    sql = `
      SELECT *
      FROM Musics
      WHERE LOWER(musicDescription) LIKE LOWER (?)
        AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2))
        ${durationSearch === 'greaterThanOrEqual' ? '>=' : '<'} ?
    `;
  }

  // Make a database query and remember the result using the search term
  let result = await query(sql, ['%' + searchTerm + '%', durationSearch === 'greaterThanOrEqual' ? 30 : 30]);

  // Send a response to the client
  response.json(result);
});
