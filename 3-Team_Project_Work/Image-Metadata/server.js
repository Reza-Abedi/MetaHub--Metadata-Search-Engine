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

app.get('/api/search/:searchTerm/:searchType', async (request, response) => {
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

const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
