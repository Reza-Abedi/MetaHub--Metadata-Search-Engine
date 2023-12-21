import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

// Serve all files in the client folder
app.use(express.static('client'));

// Declare the db variable outside the initializeDatabase function
let db;

// Start the server on a certain port
app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
  initializeDatabase();
});
  //  Database initialization logic goes here

async function initializeDatabase() {
  // Create a connection 'db' to the database
  db = await mysql.createConnection({
    host: '161.97.144.27',
    port: '8093',
    user: 'root',
    password: 'guessagain93',
    database: 'MetaHub'
  });

}

// API route for searching PDFs by title, type, and sorting option
app.get('/api/pdfs/:searchTerm/:searchType/:sortOption', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let searchType = request.params.searchType;
  let sortOption = request.params.sortOption;

  // Modify the SQL query based on the selected sorting option
  let sql = `
    SELECT *
    FROM PDFs
    WHERE LOWER(pdfDescription->'$.info.Title') LIKE LOWER(?)
  `;

  // Append ORDER BY clause for sorting
  if (sortOption === 'asc') {
    sql += ' ORDER BY pdfDescription->\'$.info.Title\' ASC';
  } else if (sortOption === 'desc') {
    sql += ' ORDER BY pdfDescription->\'$.info.Title\' DESC';
  }

  let pdfs = await query(sql, ['%' + searchTerm + '%']);

  // Modify the response structure based on your database schema
  response.json(pdfs);
});

// API route for downloading PDFs
app.get('/api/pdfs/download/:pdfId', (request, response) => {
  const filePath = `path/to/your/pdf/files/${request.params.pdfId}`;
  response.download(filePath);
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
