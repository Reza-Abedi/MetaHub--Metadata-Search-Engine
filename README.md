# Metadata Search Engine (Group3) 

 
## Project Overview 
Our team, consisting of three members, undertook the task of building a metadata search engine as part of the for the Metadata course. The primary objective of the project was to create a search engine capable of processing various file types (Images, Mp3, PPT and PDF), extracting metadata, and storing it in a MySQL database. 
 
### User stories 
New user stories may be added or old ones removed by the product owner, but these are the ones we currently have: 
- As a system owner, I want a MySQL database that can effectively store metadata about various types of files so that I can search for a file through a metadata search. 
- As a system owner, I want a system that can extract metadata from folders of files and save the metadata related to file names/paths in the database. 
- As a system owner, I want a MySQL database that can effectively store metadata about web pages/URLs so that I can search for a webpage through a metadata search. (Hold off on this user story until a review of scraping/harvesting data from web pages is done in week 49.) 
- As a visitor, I want a web-based interface for searching metadata so that it is easy for me to search and view results. 
- As a visitor, I want to be able to choose what I want to search (a specific file type or web pages) so that the system understands the type of data I want to search for. 
- As a visitor, I want to be able to search both by file name and metadata so that I can easily find what I'm looking for. 
- As a visitor, I want to be able to search effectively in the metadata (e.g., if something is equal to, not equal to, greater than, less than) a certain value, so that it is easy for me to refine my search. 
- As a visitor, I want to be able to search geographically when the metadata contains geographic information (latitude and longitude). 
- As a visitor and system owner, I want the system to have a set of test data (non-copyright protected) so that I can test that the system functions as intended. 
 
### Technologies Used 
- Node.js: Employed for metadata extraction from files and web pages using relevant libraries and plugins. 
- MySQL: Chosen as the cloud-based server for storing extracted metadata. 
- Git (GitHub): Utilized for version control to facilitate collaborative development. 
 
### Team Collaboration
Communication: We established clear communication channels using Teams, ensuring effective information exchange and prompt issue resolution. 

### Project Management: 
- Jira (Kanban) was employed for task organization, progress tracking, and task assignment. We employed Jira(Kanban) to streamline these processes and ensure a well-organized development workflow.  

### Code Collaboration: 
We adopted a feature branch strategy using Git. Each team member worked on a specific feature in a separate branch before merging into the main branch. Code reviews were regularly conducted to ensure code quality by Mohammadreza (Reza)

### Meetings-Microsoft Teams: 
Regular team meetings were scheduled to discuss progress, challenges, and coordinate tasks. These meetings fostered a collaborative environment and allowed for quick problem resolution. 



MohammadReza Abedi: As the project manager, He took the lead in mapping out the project. This involved overseeing the overall project structure, coordinating task assignments, and ensuring alignment with project timelines. Throughout the process, Reza took on the responsibility of ensuring that the collected sources aligned seamlessly with the designated implementation patterns. This quality check was crucial for maintaining consistency in our work. 


Yinghua Zhu: 

Shiva Paknegar: 


---


## Database Report: MetaHub

### Database Structure:

#### Images Table:
**Columns:**
- `imageId` (INT): Auto-incremented primary key for image identification.
- `imageName` (VARCHAR(100)): Unique name of the image.
- `imageDescription` (JSON): JSON data structure for storing image metadata.

#### PowerPoints Table:
**Columns:**
- `pptId` (INT): Auto-incremented primary key for PowerPoint identification.
- `pptName` (VARCHAR(100)): Unique name of the PowerPoint.
- `pptDescription` (JSON): JSON data structure for storing PowerPoint metadata.

#### Musics Table:
**Columns:**
- `musicId` (INT): Auto-incremented primary key for music identification.
- `musicName` (VARCHAR(100)): Unique name of the music.
- `musicDescription` (JSON): JSON data structure for storing music metadata.

#### PDFs Table:
**Columns:**
- `pdfId` (INT): Auto-incremented primary key for PDF identification.
- `pdfName` (VARCHAR(100)): Unique name of the PDF.
- `pdfDescription` (JSON): JSON data structure for storing PDF metadata.

### Explanation:
The database employs a common structure for each content type, with a unique identifier (`Id`), a name field (`Name`) to ensure uniqueness, and a `Description` field stored as JSON to accommodate various metadata attributes associated with each type of content.

---

# Extract and Insert Metadata into MetaHub Database 

**Note:** The source files for extract files are expected to be located in the `2-Metadata_Extraction` folder. 

This folder contains code snippets written in JavaScript to extract metadata from various types of digital content (images, music files, PDFs, and PowerPoints) and insert them into the MetaHub database.

### Image Metadata Extraction
The code utilizes the `exifr` library to parse EXIF data from JPEG images. Extracted metadata is then inserted into the MetaHub database's Images table, storing information such as image name and description in JSON format.

### Music Metadata Extraction
For music files, the `music-metadata` library is employed to extract metadata. Unnecessary metadata fields are removed before inserting relevant information, including music name and description, into the MetaHub Musics table.

### PDF Metadata Extraction
The code uses the `pdf-parse-fork` library to extract metadata, including the number of pages and additional information, from PDF files. The extracted data, along with the full text, is inserted into the MetaHub PDFs table.

### PowerPoint Metadata Insertion
PowerPoint metadata stored in a JSON file is read and processed. Unnecessary fields are removed, and the remaining metadata is inserted into the MetaHub PowerPoints table.

### Database Connection
A MySQL database connection is established using the `mysql2` library, with a connection pool for efficient handling of database connections. The connection details, including host, port, user, password, and database name, are specified in the code.

---

# Search Applications

## Music Metadata Search Application
This eplanation contains code for a music metadata search application. Users can search for songs based on various criteria, and the application retrieves and displays relevant information from a MySQL database.

### Team Member Responsible
This task was implemented by **Shiva Paknegar**.

### Project Structure

- **Client**: Contains the HTML, CSS, and JavaScript files for the frontend.
  - `index.html`: Defines the structure of the web page.
  - `style.css`: Provides styles for the HTML elements.
  - `main.js`: Handles client-side functionality, including music search and result display.

- **Server**:
  - `main.js`: An Express.js server file that serves static files from the 'Client' folder and handles API requests for music search.
  
### How to Run
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server with `npm start`.

### Music Search API
The application exposes an API endpoint for music search:
- Endpoint: `/api/music/:searchTerm/:searchType/:durationSearch`
  - `searchTerm`: The term to search for.
  - `searchType`: Type of search (artist, album, title, or all).
  - `durationSearch`: Duration filter (all, bigger, equal, smaller).

#### License
This project is licensed under the [MIT License](LICENSE).








