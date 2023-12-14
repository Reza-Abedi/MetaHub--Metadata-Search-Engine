import exifr from 'exifr';
import fs from 'fs';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '161.97.144.27',
  port: '8093',
  user: 'root',
  password: 'guessagain93',
  database: 'MetaHub'
});

async function insertMetadata(image, metadata) {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(
      'INSERT INTO Images (imageName, imageDescription) VALUES (?, ?)',
      [image, JSON.stringify(metadata)]
    );
    console.log(`Metadata for ${image} inserted into the database.`);
    connection.release();
  } catch (error) {
    console.error(`Error inserting metadata for ${image}: ${error.message}`);
  }
}

async function processImages() {
  try {
    let images = fs.readdirSync('Image');
    for (let image of images) {
      if (image.slice(-4) === '.jpg') {
        console.log('IMAGE: ' + image);
        try {
          let metadata = await exifr.parse('Image/' + image);
          console.log(metadata);
          await insertMetadata(image, metadata);
        } catch (error) {
          console.error(`Error processing metadata for ${image}: ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
  } finally {
    pool.end();
  }
}

// Call the function to start processing images
processImages();
