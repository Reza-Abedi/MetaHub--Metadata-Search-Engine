
import { google } from 'googleapis';
import fs from 'fs';

// Load credentials from your JSON file
const credentials = require('./path/to/your/credentials.json');

// Set up the Google Drive API
const drive = google.drive({
  version: 'v3',
  auth: new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
  ),
});

// Upload an image to Google Drive
async function uploadImageToDrive(imagePath, folderId) {
  const fileMetadata = {
    name: 'your_image.jpg', // Set the desired file name
    parents: [folderId], // Set the folder ID where you want to upload the image
  };

  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(imagePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  console.log('Image uploaded with ID:', response.data.id);
}

// Example usage
const imagePath = '/path/to/your/image.jpg';
const folderId = '1YyTdoIXewKHPb_btZBt3BtWV2SwfYmb2'; // Your Google Drive folder ID
uploadImageToDrive(imagePath, folderId);
