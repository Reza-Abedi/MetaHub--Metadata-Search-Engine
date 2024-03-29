// Import the express package/module
import express from 'express';

// Import the database driver
import mysql from 'mysql2/promise';



// Create a web server named app
const app = express();



// Serve all files in the sharedFiles folder
app.use(express.static('sharedFiles'));



// Start the server on a certain port
app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));

//  Connection 'db' to the database METAHUB
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

app.get('/api/powerpoints/:searchTerm', async (request, response) => {
  try {
    let searchTerm = request.params.searchTerm;
    let titleSortOption = request.query.titleSort;

    // Build the SQL query based on advanced search options
    let sql = `
      SELECT *
      FROM PowerPoints
      WHERE LOWER(pptDescription -> '$.title') LIKE LOWER (?)
         OR LOWER(pptDescription -> '$.company') LIKE LOWER (?)
    `;

    if (titleSortOption === 'ascending') {
      sql += ` ORDER BY pptDescription -> '$.title' ASC `;
    } else if (titleSortOption === 'descending') {
      sql += ` ORDER BY pptDescription -> '$.title' DESC `;
    }

    let presentations = await query(sql, ['%' + searchTerm + '%', '%' + searchTerm + '%']);

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
  } catch (error) {
    console.error('Error searching PowerPoint presentations:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route for downloading PowerPoint presentations
app.get('/api/powerpoints/download/:pptName', (request, response) => {
  const filePath = `sharedFiles/${request.params.pptName}`; 
  response.download(filePath);
});
app.get('/api/pdfs/:searchTerm', async (request, response) => {
  try {
    let searchTerm = request.params.searchTerm;
 
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
 
    const formattedResponse = pdfs.map(pdf => ({
      metadata: pdf.pdfDescription.info,
      downloadLink: `/api/pdfs/download/${encodeURIComponent(pdf.pdfName)}` 
    }));
 
    response.json(formattedResponse);
  } catch (error) {
    console.error('Error searching PDFs:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
 
app.get('/api/pdfs/download/:pdfName', (request, response) => {
  try {
    const pdfName = request.params.pdfName;
 
    // Construct the file path based on the PDF name
    const filePath = `sharedFiles/PDF/${pdfName}`;
 
    // Set the content type to 'application/pdf'
    response.setHeader('Content-Type', 'application/pdf');
 
    // Serve the file for download
    response.download(filePath, pdfName, (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
        response.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error('Error downloading PDF:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});



// API route for searching Music by metadata and providing download links
app.get('/api/music/:searchTerm/:durationSearch', async (request, response) => {
  try {
    let searchTerm = request.params.searchTerm;
    let durationSearch = request.params.durationSearch;

    let sql;

    if (durationSearch === 'bigger') {
      sql = `
        SELECT *
        FROM Musics
        WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.artist'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.album'))) LIKE LOWER(?)
          AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) > 30
      `;
    } else if (durationSearch === 'equal') {
      sql = `
        SELECT *
        FROM Musics
        WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.artist'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.album'))) LIKE LOWER(?)
          AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) = 30
      `;
    } else if (durationSearch === 'smaller') {
      sql = `
        SELECT *
        FROM Musics
        WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.artist'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.album'))) LIKE LOWER(?)
          AND CAST(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.format.duration')) AS DECIMAL(10, 2)) < 30
      `;
    } else {
      // Default to all durations
      sql = `
        SELECT *
        FROM Musics
        WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.title'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.artist'))) LIKE LOWER(?)
          OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(musicDescription, '$.common.album'))) LIKE LOWER(?)
      `;
    }

    let result = await query(sql, Array(3).fill('%' + searchTerm + '%'));

    response.json(result);
  } catch (error) {
    console.error('Error searching Music:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// API route for searching Images by metadata and providing download links
app.get('/api/images/:searchTerm/:searchType', async (request, response) => {
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

// A route for downloading Image files
app.get('/api/images/download/:imageName', (request, response) => {
  const filePath = `sharedFiles/${request.params.imageName}`; // Update the path
  response.download(filePath);
});

