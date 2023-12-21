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

// API route for searching PowerPoint presentations by title
app.get('/api/powerpoints/:searchTerm', async (request, response) => {
  let searchTerm = request.params.searchTerm;

  // Perform the database query and retrieve presentations based on the search term
  // Replace the following lines with your actual database query logic
  let sql = `
    SELECT *
    FROM PowerPoints
    WHERE LOWER(pptDescription -> '$.title') LIKE LOWER (?)
  `;

  let presentations = await query(sql, ['%' + searchTerm + '%']);

  // Modify the response structure based on your database schema
  let formattedPresentations = presentations.map(presentation => {
    return {
      pptName: presentation.pptName,
      title: presentation.pptDescription.title || 'N/A',
      company: presentation.pptDescription.company || 'N/A',
      timestamp: presentation.pptDescription.timestamp || 'N/A',
      wordCount: presentation.pptDescription.word_count || 'N/A',
      slideCount: presentation.pptDescription.slide_count || 'N/A',
      creationDate: presentation.pptDescription.creation_date || 'N/A',
      lastModified: presentation.pptDescription.last_modified || 'N/A',
      downloadLink: `/api/powerpoints/download/${presentation.pptName}` // Add download link
    };
  });

  response.json(formattedPresentations);
});

// API route for downloading PowerPoint presentations
app.get('/api/powerpoints/download/:pptName', (request, response) => {
  // Replace the following line with logic to serve the file for download
  const filePath = `C:/Users/Mreza.Abedi/OneDrive/Skrivbord/PowerpointsMetadata/client/ppt/${request.params.pptName}`;
  response.download(filePath);
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
