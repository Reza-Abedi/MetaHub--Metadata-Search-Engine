// Import the express package/module
import express from 'express';

// Import the database driver
import mysql from 'mysql2/promise';

// Create a web server named app
const app = express();

// Serve all files in the folder client
app.use(express.static('Client'));

// Start the server on a certain port
// and write to the terminal which port...
app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));

// Create a connection 'db' to the database
const db = await mysql.createConnection({
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

// A search route to find music
// A search route to find music
app.get('/api/music/:searchTerm/:searchType/:durationSearch', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchType = request.params.searchType;
  let durationSearch = request.params.durationSearch;

  // Construct the SQL query based on the search type and duration search
  let sql;

  if (durationSearch === 'bigger') {
    sql = `
      SELECT *
      FROM Musics
      WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
        AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) > 30
    `;
  } else if (durationSearch === 'equal') {
    sql = `
      SELECT *
      FROM Musics
      WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
        AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) = 30
    `;
  } else if (durationSearch === 'smaller') {
    sql = `
      SELECT *
      FROM Musics
      WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
        AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) < 30
    `;
  } else {
    // Default to all durations
    sql = `
      SELECT *
      FROM Musics
      WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
    `;
  }

  // Make a database query and remember the result using the search term
  let result = await query(sql, ['%' + searchTerm + '%']);

  // Send a response to the client
  response.json(result);
});
