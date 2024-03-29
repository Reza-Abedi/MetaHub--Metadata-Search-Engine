// server.js

import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

// Serve all files in the client folder
app.use(express.static('Client'));

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
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  });

  // Your database initialization logic goes here
  // For example, you might want to create tables or perform other setup tasks
}

// API route for searching PowerPoint presentations with advanced search options
app.get('/api/powerpoints/:searchTerm', async (request, response) => {
  let searchTerm = request.params.searchTerm;
  let titleSortOption = request.query.titleSort;

  // Build the SQL query based on advanced search options
  let sql = `
    SELECT *
    FROM PowerPoints
    WHERE LOWER(pptDescription -> '$.title') LIKE LOWER (?)
  `;

  // Add sorting based on title
  if (titleSortOption === 'ascending') {
    sql += ` ORDER BY pptDescription -> '$.title' ASC `;
  } else if (titleSortOption === 'descending') {
    sql += ` ORDER BY pptDescription -> '$.title' DESC `;
  }

  let presentations = await query(sql, ['%' + searchTerm + '%']);

  // Modify the response structure based on your database schema
  let formattedPresentations = presentations.map(presentation => {
    return {
      pptName: presentation.pptName,
      title: presentation.pptDescription.title || 'N/A',
      company: presentation.pptDescription.company || 'N/A',
      timestamp: presentation.pptDescription.timestamp || 'N/A',
      wordCount: presentation.pptDescription.word_count || 'N/A',
      slideCount: presentation.pptDescription.actual_slide_count_column_name || 'N/A',
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
  const filePath = `PPT-Metadata\Client\PPTs${request.params.pptName}`;
  response.download(filePath);
});

// A small function for a database query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
