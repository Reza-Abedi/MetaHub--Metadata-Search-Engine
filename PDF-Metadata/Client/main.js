// main.js

// Function to handle the search form submission
async function search() {
  // Read the search term and search type from the input fields
  let searchTermInput = document.forms.searchForm.term;
  let searchTypeInput = document.forms.searchForm.searchType;

  // Check if searchTermInput and searchTypeInput are defined before accessing their values
  let searchTerm = searchTermInput ? searchTermInput.value : '';
  let searchType = searchTypeInput ? searchTypeInput.value : 'all';

  // Check if searchTerm is empty and handle it as needed
  if (!searchTerm.trim()) {
    alert('Please enter a search term.');
    return;
  }

  // Display loading message while fetching data
  let resultsContainer = document.querySelector('.searchResults');
  resultsContainer.innerHTML = '<p>Loading...</p>';

  try {
    // Make a fetch request to the server API endpoint for searching PDFs
    let response = await fetch(`/api/pdfs/${searchTerm}/${searchType}`);
    let pdfs = await response.json();

    // Display the information in the HTML
    resultsContainer.innerHTML = ''; // Clear previous results

    if (pdfs.length === 0) {
      resultsContainer.innerHTML = '<p>No matching PDFs found.</p>';
    } else {
      // Create a table element
      let table = document.createElement('table');
      table.classList.add('result-table');

      // Create the table header
      let tableHeader = document.createElement('thead');
      tableHeader.innerHTML = `
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Creator</th>
          <th>Creation Date</th>
          <th>Producer</th>
          <th>Number of Pages</th>
          <th>Download</th>
        </tr>
      `;
      table.appendChild(tableHeader);

      // Create the table body
      let tableBody = document.createElement('tbody');
      pdfs.forEach(pdf => {
        // Check if the expected properties are present in the PDF object
        let title = pdf.pdfDescription && pdf.pdfDescription.info ? pdf.pdfDescription.info.Title : 'N/A';

        let row = document.createElement('tr');
        row.innerHTML = `
          <td>${title}</td>
          <td>${pdf.pdfDescription?.info?.Author || 'N/A'}</td>
          <td>${pdf.pdfDescription?.info?.Creator || 'N/A'}</td>
          <td>${pdf.pdfDescription?.info?.CreationDate || 'N/A'}</td>
          <td>${pdf.pdfDescription?.info?.Producer || 'N/A'}</td>
          <td>${pdf.pdfDescription?.numpages || 'N/A'}</td>
          <td><a href="/api/pdfs/download/${pdf.pdfId}" download>Download PDF</a></td>
        `;

        tableBody.appendChild(row);
      });

      table.appendChild(tableBody);

      resultsContainer.appendChild(table);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = '<p>Error: Something went wrong while fetching data.</p>';
  }
}
