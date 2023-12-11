
import fs from 'fs';
import musicMetadata from 'music-metadata';
import mysql from 'mysql2/promise';

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


const files = await fs.readdirSync('Music');


for (let file of files) {

  let metadata = await musicMetadata.parseFile('./music/' + file);


  delete metadata.native;
  delete metadata.quality;
  delete metadata.common.disk;


  let result = await query(`
    INSERT INTO Musics (musicName, musicDescription)
    VALUES(?, ?)
  `, [file, metadata]);


  console.log(file, result);

}


process.exit();