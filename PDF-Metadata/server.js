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

async function initializeDatabase() {
  // Create a connection 'db' to the database
  db = await mysql.createConnection({
    host: '161.97.144.27',
    port: '8093',
    user: 'root',
    password: 'guessagain93',
    database: 'MetaHub'
  });

  // Your database initialization logic goes here
  // For example, you might want to create tables or perform other setup tasks
}

// API route for searching PDFs by metadata and providing download links
app.get('/api/pdfs/:searchTerm', async (request, response) => {
  try {
    let searchTerm = request.params.searchTerm;

    // Modify the SQL query based on the selected sorting option
    let sql = `
      SELECT *
      FROM PDFs
      WHERE LOWER(pdfDescription->'$.info.Title') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.Author') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.Creator') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.ModDate') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.Keywords') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.Producer') LIKE LOWER(?)
         OR LOWER(pdfDescription->'$.info.CreationDate') LIKE LOWER(?)
    `;

    let pdfs = await query(sql, Array(7).fill('%' + searchTerm + '%'));

    // Modify the response structure based on your database schema
    const formattedResponse = pdfs.map(pdf => ({
      metadata: pdf.pdfDescription.info,
      downloadLink: `/api/pdfs/download/${pdf.pdfId}`
    }));

    response.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching data:', error);
    response.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// API route for downloading PDFs
app.get('/api/pdfs/download/:pdfId', (request, response) => {
  // Replace the following line with logic to serve the file for download
  const filePath = `path/to/your/pdf/files/${request.params.pdfId}`;
  response.download(filePath);
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
