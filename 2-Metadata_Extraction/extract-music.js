
import fs from 'fs';
import musicMetadata from 'music-metadata';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: '',
    port: '',
    user: '',
    password: '',
    database: ''
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
