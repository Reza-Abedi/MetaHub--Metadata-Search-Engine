import express from 'express';
import path from 'path';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.static('C:/Users/shiva/Desktop/image-metadata/Client'));

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
            SELECT imageId, imageName, imageDescription
            FROM Images
            WHERE LOWER(imageDescription -> '$.${searchType}') LIKE LOWER (?)
        `;

        if (searchType == 'all') {
            sql = `
                SELECT imageId, imageName, imageDescription
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

app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'Image-Metadata\Client\IMAGEs', imageName);
    res.sendFile(imagePath);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
