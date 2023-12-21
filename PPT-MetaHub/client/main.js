// main.js

// Function to handle the search form submission
async function search() {
  // Read the search term from the input field
  let searchTerm = document.forms.searchForm.term.value;

  // Read the selected sorting option
  let titleSortOption = document.forms.searchForm.titleSort.value;

  // Make a fetch request to the server API endpoint for searching PowerPoint presentations
  let response = await fetch(`/api/powerpoints/${searchTerm}?titleSort=${titleSortOption}`);
  let presentations = await response.json();

  // Display the information in the HTML table
  let resultsContainer = document.querySelector('.searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (presentations.length > 0) {
    let table = document.createElement('table');
    table.classList.add('responsive-table');

    table.innerHTML = `
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Timestamp</th>
          <th>Word Count</th>
          <th>Creation Date</th>
          <th>Last Modified</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    presentations.forEach(presentation => {
      let row = table.querySelector('tbody').insertRow();
      row.innerHTML = `
        <td>${presentation.title}</td>
        <td>${presentation.company}</td>
        <td>${presentation.timestamp}</td>
        <td>${presentation.wordCount}</td>
        <td>${presentation.creationDate}</td>
        <td>${presentation.lastModified}</td>
        <td><a href="${presentation.downloadLink}" download>Download File</a></td>
      `;
    });

    resultsContainer.appendChild(table);
  } else {
    resultsContainer.innerHTML = 'No results found.';
  }
}
