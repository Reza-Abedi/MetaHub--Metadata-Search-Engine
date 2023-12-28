# Metadata Search Engine (Group3) 
`We would like to note that all final project files are located in the`**'sharedFiles'** `directory, and the server should be run from the`**' /root directory'** ` using the command `**'node server.js'**
 
## Project Overview 
Our team, consisting of three members, undertook the task of building a metadata search engine as part of the for the Metadata course. The primary objective of the project was to create a search engine capable of processing various file types (Images, Mp3, PPT and PDF), extracting metadata, and storing it in a MySQL database. 
 
### User stories 
- As a system owner, I want to have a MySQL database that can effectively store metadata about different types of files so that it's possible to search for a file through a search in the metadata.
- As a system owner, I want there to be a system that can extract metadata about files from folders and save the metadata related to file names/path in the database.
- As a visitor, I want there to be a web-based interface for searching in the metadata so that it's easy for me to search and see results.
- As a visitor, I want to be able to choose what I want to search (a specific file type) so that the system understands the type of data I want to search for.
- As a visitor, I want to be able to search both by file name and different metadata so that I can easily find what I am looking for.
- As a visitor, I want to be able to search in the metadata in a good way (e.g., if something is equal to, not equal to, greater than, less than) a certain value so that it's easy for me to refine my search.
- As a visitor, I want to be able to search geographically when the metadata contains geographic information (latitude and longitude).
- As a visitor and system owner, I want the system to have a set of test data (non-copyright-protected) so that I can test that the system is functioning as it should.
 
---

## Team Contributions

### Shiva Paknegar
Shiva Paknegar took on multiple responsibilities and made significant contributions to the project:
- **PDF Metadata Extraction:**  Played a crucial role in extracting metadata from PDF files. This involved handling various aspects of PDF information.
- **Music Application Preparation:** Meticulously prepared the music application, contributing to its functionality and ensuring it met the project requirements.
- **Debugging Expertise:** Actively participated in debugging sessions, demonstrating her problem-solving skills and attention to detail.
- **Latitude and Longitude for Photos:** Shiva was responsible for creating functionalities related to latitude and longitude for the photo application, enriching its metadata search capabilities.
- **HTML Intro Pages:** Shiva contributed to the project's frontend by creating HTML intro pages, enhancing the user experience.
- **Navigator Implementation:** Shiva implemented navigators, improving the overall navigation within the project.

### Yinghua Zhu
Yinghua Zhu's contributions were focused on specific areas, showcasing her expertise:
- **Images Application Creation:-** Yinghua took the lead in creating the photo application, demonstrating her proficiency in frontend development.
- **Collaborative File Structuring:** Collaborated effectively with the team to structure project files. This ensured a coherent and organized presentation of files on the shared server.

### MohammadReza Abedi
As the project manager, MohammadReza Abedi played a central role in steering the project and contributed significantly to various aspects:
- **Project Management:** Served as the project manager, providing overall direction, guidance, and coordination. He took the lead in mapping out the project. This involved overseeing the overall project structure, coordinating task assignments, and ensuring alignment with project timelines. 
- **Framework Building:** He was responsible for building the project framework, ensuring a solid foundation for development.
- **Metadata Extraction:** Handled the extraction of metadata, specifically from both photos and PowerPoint presentations.
- **PowerPoint Application:** He took on the specific responsibility of creating the PowerPoint application, contributing to its design and functionality.
- **Debugging Involvement:** MohammadReza actively participated in debugging sessions, addressing issues and ensuring the project's stability.
- **Enhanced Photo Application Search:** In the photo application, MohammadReza added the ability to search with latitude and longitude coordinates, expanding its search capabilities.
- **HTML Table Styling:** He contributed to the project's frontend by implementing a visually appealing HTML table based on the HDM style.
- **Report Preparation:** Reza took charge of preparing comprehensive reports, documenting project progress, milestones, and relevant insights. 

### Technologies Used 
- Node.js: Employed for metadata extraction from files and web pages using relevant libraries and plugins. 
- MySQL: Chosen as the cloud-based server for storing extracted metadata. 
- Git (GitHub): Utilized for version control to facilitate collaborative development. 
 
### Meetings-Microsoft Teams: 
Regular team meetings were scheduled to discuss progress, challenges, and coordinate tasks. These meetings fostered a collaborative environment and allowed for quick problem resolution. 

### Project Management: 
- Jira (Kanban) was employed for task organization, progress tracking, and task assignment. We employed Jira(Kanban) to streamline these processes and ensure a well-organized development workflow.  

### Code Collaboration: 
We adopted a feature branch strategy using Git and Microsoft Teams. 

---

## Database Report: MetaHub

### Database Structure:

- **Images Table:**
  - `imageId` (INT): Auto-incremented primary key for image identification.
  - `imageName` (VARCHAR(100)): Unique name of the image.
  - `imageDescription` (JSON): JSON data structure for storing image metadata.

- **PowerPoints Table:**
  - `pptId` (INT): Auto-incremented primary key for PowerPoint identification.
  - `pptName` (VARCHAR(100)): Unique name of the PowerPoint.
  - `pptDescription` (JSON): JSON data structure for storing PowerPoint metadata.

- **Musics Table:**
  - `musicId` (INT): Auto-incremented primary key for music identification.
  - `musicName` (VARCHAR(100)): Unique name of the music.
  - `musicDescription` (JSON): JSON data structure for storing music metadata.

- **PDFs Table:**
  - `pdfId` (INT): Auto-incremented primary key for PDF identification.
  - `pdfName` (VARCHAR(100)): Unique name of the PDF.
  - `pdfDescription` (JSON): JSON data structure for storing PDF metadata.

**Explanation:**
The database employs a common structure for each content type, with a unique identifier (`Id`), a name field (`Name`) to ensure uniqueness, and a `Description` field stored as JSON to accommodate various metadata attributes associated with each type of content.

---

# Extract and Insert Metadata into MetaHub Database 

**Note:** The source files for extract files are expected to be located in the `2-Metadata_Extraction` folder. 
This folder contains code snippets written in JavaScript to extract metadata from various types of digital content (images, music files, PDFs, and PowerPoints) and insert them into the MetaHub database.

**Image Metadata Extraction:** The code utilizes the `exifr` library to parse EXIF data from JPEG images. Extracted metadata is then inserted into the MetaHub database's Images table, storing information such as image name and description in JSON format.

**Music Metadata Extraction:**
For music files, the `music-metadata` library is employed to extract metadata. Unnecessary metadata fields are removed before inserting relevant information, including music name and description, into the MetaHub Musics table.

**PDF Metadata Extraction:**
The code uses the `pdf-parse-fork` library to extract metadata, including the number of pages and additional information, from PDF files. The extracted data, along with the full text, is inserted into the MetaHub PDFs table.

**PowerPoint Metadata Insertion:**
PowerPoint metadata stored in a JSON file is read and processed. Unnecessary fields are removed, and the remaining metadata is inserted into the MetaHub PowerPoints table.

**Database Connection:**
A MySQL database connection is established using the `mysql2` library, with a connection pool for efficient handling of database connections. The connection details, including host, port, user, password, and database name, are specified in the code.

---

# Search Applications


## Music Metadata Search Application
This eplanation contains code for a music metadata search application. Users can search for songs based on various criteria, and the application retrieves and displays relevant information from a MySQL database.

**Team Member Responsible:** This task was implemented by **Shiva Paknegar** - [GitHub Profile](https://github.com/shivapaknegar)

**Project Structur:**

- **Client**: Contains the HTML, CSS, and JavaScript files for the frontend.
  - `index.html`: Defines the structure of the web page.
  - `style.css`: Provides styles for the HTML elements.
  - `main.js`: Handles client-side functionality, including music search and result display.

- **Server**:
  - `main.js`: An Express.js server file that serves static files from the 'Client' folder and handles API requests for music search.
  
- **How to Run**:
  - 1. Clone this repository.
  - 2. Install dependencies using `npm install`.
  - 3. Start the server with `npm start`.

- **Music Search API**:The application exposes an API endpoint for music search:

   - Endpoint: `/api/music/:searchTerm/:searchType/:durationSearch`
   - `searchTerm`: The term to search for.
   - `searchType`: Type of search (artist, album, title, or all).
   - `durationSearch`: Duration filter (all, bigger, equal, smaller).

**Search Results**:
The search results are displayed in a table with the following columns:
   - Song
   - Artist
   - Album
   - Duration
   - Play 
**License** This project is licensed under the [MIT License](https://github.com/shivapaknegar).




## PDF Metadata Search Application

This explanation contains code for a PDF metadata search application. Users can search for PDFs based on various criteria, and the application retrieves and displays relevant information from a MySQL database.

**Team Member Responsible:** This task was implemented by **Shiva Paknegar** - [GitHub Profile](https://github.com/shivapaknegar)

**Project Structure**
- **Client**: Contains the HTML, CSS, and JavaScript files for the frontend.
  - `index.html`: Defines the structure of the web page.
  - `style.css`: Provides styles for the HTML elements.
  - `main.js`: Handles client-side functionality, including PDF search and result display.

- **Server:**
  - `main.js`: An Express.js server file that serves static files from the 'Client' folder and handles API requests for PDF search.
  
- **How to Run:**
   - 1. Clone this repository.
   - 2.  Install dependencies using `npm install`.
   - 3. Start the server with `npm start`.

- **PDF Search API:**
The application exposes an API endpoint for PDF search:
   - Endpoint: `/api/pdfs/:searchTerm`
   - `searchTerm`: The term to search for.

- **Search Results:**
The search results are displayed in a table with the following columns:
  - Title
  - Author
  - Creator
  - ModDate
  - CreationDate
  - Download
**License:**This project is licensed under the [MIT License](https://github.com/shivapaknegar).



## Image Metadata Search Application

This explanation contains code for an image metadata search application. Users can search for images based on various criteria, and the application retrieves and displays relevant information from a MySQL database.

**Team Member Responsible:** This task was implemented by **Yinghua Zhu** - [GitHub Profile](https://github.com/Yinghua009)

**Project Structure:**
- **Client**: Contains the HTML, CSS, and JavaScript files for the frontend.
  - `index.html`: Defines the structure of the web page.
  - `style.css`: Provides styles for the HTML elements.
  - `main.js`: Handles client-side functionality, including image search and result display.

- **Server:**
  - `server.js`: An Express.js server file that serves static files from the 'client' folder and handles API requests for image search.

- **How to Run:**
  - 1. Clone this repository.
  - 2. Install dependencies using `npm install`.
  - 3. Start the server with `npm start`.

- **Image Search API:**
The application exposes an API endpoint for image search:
  - Endpoint: `/api/search/:searchTerm/:searchType`
  - `searchTerm`: The term to search for.
  - `searchType`: Type of search (Make, Model, or all).

- **Image Search Results:**
The image search results are displayed in a table with the following columns:
  - Name
  - Make
  - Model
  - Latitude
  - Longitude
  - CreateDate
  - Orientation
  - Width
  - Height
  - Image Preview
**License:** This project is licensed under the [MIT License](https://github.com/Yinghua009).



## PowerPoint Metadata Search Application

This explanation contains code for a PowerPoint metadata search application. Users can search for presentations based on various criteria, and the application retrieves and displays relevant information from a MySQL database.

**Team Member Responsible**: This task was implemented by **MohammadReza Abedi** - [GitHub Profile](https://github.com/Reza-Abedi)

**Project Structure**
- **Client**: Contains the HTML, CSS, and JavaScript files for the frontend.
  - `index.html`: Defines the structure of the web page.
  - `style.css`: Provides styles for the HTML elements.
  - `main.js`: Handles client-side functionality, including PowerPoint search and result display.

- **Server:**
  - `server.js`: An Express.js server file that serves static files from the 'Client' folder and handles API requests for PowerPoint search.

- **How to Run:**
  - 1. Clone this repository.
  - 2. Install dependencies using `npm install`.
  - 3. Start the server with `npm start`.

- **PowerPoint Search API:**
The application exposes an API endpoint for PowerPoint search:
  - Endpoint: `/api/powerpoints/:searchTerm`
  - `searchTerm`: The term to search for.
  - Query Parameter: `titleSort` (Sort by Title: "ascending" or "descending").

- **Search Form:**
  - `Search Term`: Input for the term to search for.
  - `Sort by Title`: Dropdown to select the sorting order for presentation titles.

- **Search Results:**
The search results are displayed in a table with the following columns:
  - Title
  - Company
  - Timestamp
  - Word Count
  - Creation Date
  - Last Modified
  - Download
**License:**This project is licensed under the [MIT License](https://github.com/Reza-Abedi).

---

# MetaHub Metadata-Search Engine (sharedFiles and server.js)

**Overview:** The MetaHub Search Application Server is an Express.js server designed to manage and serve various file types, including images, music, PDFs, and PowerPoint presentations. The server provides a unified API for searching and downloading files based on metadata criteria, ensuring a seamless experience for users.

## Key Features

1. **Unified API Structure:**
   - Consistent and straightforward interactions with different file types.
   - Designated routes for each file type for searching and downloading.

2. **Static File Serving:**
   - Express.js serves static files from the "sharedFiles" folder.
   - Easy access to HTML, CSS, JavaScript, and other frontend files.

3. **Database Connection:**
   - Connection to a MySQL database hosted at '161.97.144.27:8093'.
   - Enables execution of queries to retrieve metadata information.

4. **Modular Database Query Function:**
   - Versatile `query` function for executing SQL queries.
   - Enhances code readability and reusability.

5. **File Search and Download Routes:**
   - *PowerPoint Presentations:* Search and sorting routes, download route.
   - *PDFs:* Search based on metadata, download route.
   - *Music:* Metadata search, duration filtering, download links.
   - *Images:* Metadata search, download route.

**Server Initialization and Hosting:** The server initializes by creating an Express app, establishing a MySQL connection, and serving static files. It listens on port 3000 and logs its status to the console.

## Application Features

#### Image Metadata Search
**Filters:** Search based on attributes like Make, Model, or all.
**Search Term:** The user can enter a search term to filter images.
**Attributes:** The application filters images based on metadata attributes such as Make, Model, etc.


#### PowerPoint Metadata Search:
**Filters:** Sorting option for PowerPoint presentations based on title (ascending or descending).
**Search Term:** The user can enter a search term to filter PowerPoint presentations.
**Attributes:** The application filters PowerPoint presentations based on the title.

#### PDF Metadata Search:
**Filters:** Search based on various attributes like Title, Author, Creator, ModDate, Keywords, Producer, and CreationDate.
**Search Term:** The user can enter a search term to filter PDFs.
**Attributes:** The application filters PDFs based on multiple metadata attributes.

#### Music Metadata Search:
**Filters:** Search based on title, artist, album, and duration categories (bigger, equal, smaller).
**Search Term:** The user can enter a search term to filter music.
**Attributes:** The application filters music based on metadata attributes such as title, artist, album, and duration.
General:

#### Case Insensitivity:
The search is case-insensitive to provide a more flexible search experience.

#### Latitude and Longitude for Photos:
 This addition enriches the photo application's metadata search capabilities by incorporating geographical data. Users can now search and filter photos based on location, providing a more comprehensive and geographically relevant search experience.

#### Download PDF, Music, PowerPoint, and Play Music:
The project includes functionality to download PDFs, music, and PowerPoint presentations directly from the application, enhancing user convenience.

**PDF Download:** Users can download PDFs directly from the application, allowing them to save and access files locally.

**Music Download:** Users can download music files directly from the application, providing an option for offline access.

**PowerPoint Download:** PowerPoint presentations are available for download, enabling users to retrieve and use files locally.

**Music Playback:** Additionally, the project supports playing music directly within the application, offering a seamless and integrated experience for users exploring music metadata.

## Conclusion:
The MetaHub Search Application Server exhibits a well-structured design, leveraging Express.js and MySQL to create a reliable platform for searching and accessing multimedia content based on metadata criteria.

**License:** This project is licensed GROUP3 - DataManager(Metadata)