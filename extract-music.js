// import file system module
// - used to read file names from the music folder
import fs from 'fs';
// import the musicMetadata
// npm module - used to read metadata from music files
import musicMetadata from 'music-metadata';
// Import the database driver
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: '161.97.144.27',
  port: '8093',
  user: 'root',
  password: 'guessagain93',
  database: 'MetaHub'
});

// A small function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

// read all file names from the Music fodler
const files = await fs.readdirSync('Music');

// loop through all music files and read metadata
for (let file of files) {

  // Get the metadata for the file
  let metadata = await musicMetadata.parseFile('./music/' + file);

  // delete (in-memory) some parts of the metadata
  // that we don't want in the database
  // note: we are not deleteing anything in the files
  delete metadata.native;
  delete metadata.quality;
  delete metadata.common.disk;

  // INSERT TO DATABASE
  let result = await query(`
    INSERT INTO Musics (musicName, musicDescription)
    VALUES(?, ?)
  `, [file, metadata]);

  // Log the result of inserting in the database
  console.log(file, result);

}

// exit/stop the script when everything is imported
// so you don't have to press Ctrl+C
process.exit();