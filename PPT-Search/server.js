import express from 'express';
import { createConnection } from 'mysql2/promise';

const app = express();
const port = 3000;

const db = await createConnection({
    host: '161.97.144.27',
    port: '8093',
    user: 'root',
    password: 'guessagain93',
    database: 'MetaHub'
});

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const query = req.query.query;

    try {
        const [results, fields] = await db.execute('SELECT * FROM PowerPoints WHERE title LIKE ?', [`%${query}%`]);
        res.json(results);
    } catch (error) {
        console.error('Error executing search query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
