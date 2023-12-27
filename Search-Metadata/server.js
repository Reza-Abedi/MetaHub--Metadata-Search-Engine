// server.js

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import mysql from 'mysql2/promise';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

const db = await mysql.createConnection({
  host: '161.97.144.27',
  port: '8093',
  user: 'root',
  password: 'guessagain93',
  database: 'MetaHub'
});

async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

app.get('/api/image/search/:searchTerm/:searchType', async (request, response) => {
  try {
      let searchTerm = request.params.searchTerm;
      let searchType = request.params.searchType;

      let sql = `
       SELECT imageName, imageDescription
       FROM Images
       WHERE LOWER(imageDescription -> '$.${searchType}') LIKE LOWER (?)
      `;

      if (searchType == 'all') {
          sql = `
            SELECT imageName, imageDescription
            FROM Images
            WHERE LOWER(imageDescription) LIKE LOWER (?)
          `;
      }

      let result = await query(sql, ['%' + searchTerm + '%']);

      response.json(result);
  } catch (error) {
      console.error('Error searching metadata:', error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
});


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

const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
