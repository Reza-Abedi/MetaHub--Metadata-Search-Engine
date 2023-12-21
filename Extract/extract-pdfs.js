import fs from 'fs';
import pdfParse from 'pdf-parse-fork';
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


const files = await fs.readdirSync('pdfs');

for (let file of files) {

  let data = await pdfParse(fs.readFileSync('./pdfs/' + file));

  let metadata = {
    numpages: data.numpages,
    info: data.info
  };

  let fullText = data.text;

  let result = await query(`
  INSERT INTO PDFs (pdfName, pdfDescription)
  VALUES(?, ?)
`, [file, metadata]);

  console.log(file);
  console.log(metadata);
  console.log(fullText);

}