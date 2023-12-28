// mainPDF.js

// Function to handle the search form submission
async function search() {
  // Read the search term from the input field
  let searchTermInput = document.forms.searchForm.term;
  let searchTerm = searchTermInput ? searchTermInput.value : '';

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
    let response = await fetch(`/api/pdfs/${searchTerm}`); // Update the URL based on your new structure
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
          <th>ModDate</th>
          <th>CreationDate</th>
          <th>Download</th>
        </tr>
      `;
      table.appendChild(tableHeader);

      // Create the table body
      let tableBody = document.createElement('tbody');
      pdfs.forEach(pdf => {
        let metadata = pdf.metadata;

        // Create a table row for each PDF
        let row = document.createElement('tr');
        row.innerHTML = `
          <td>${metadata.Title || 'N/A'}</td>
          <td>${metadata.Author || 'N/A'}</td>
          <td>${metadata.Creator || 'N/A'}</td>
          <td>${metadata.ModDate || 'N/A'}</td>
          <td>${metadata.CreationDate || 'N/A'}</td>
          <td><a href="${pdf.downloadLink}" download>Download PDF</a></td>
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
