// main.js

// Function to handle the search form submission
async function search() {
  // Read the search term from the input field
  let searchTerm = document.forms.searchForm.term.value;

  // Make a fetch request to the server API endpoint for searching PowerPoint presentations
  let response = await fetch(`/api/powerpoints/${searchTerm}`);
  let presentations = await response.json();

  // Display the information in the HTML
  let resultsContainer = document.querySelector('.searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  presentations.forEach(presentation => {
    let html = `
      <section>
        <h2>${presentation.title}</h2>
        <p><b>Company:</b> ${presentation.company}</p>
        <p><b>Timestamp:</b> ${presentation.timestamp}</p>
        <p><b>Word Count:</b> ${presentation.wordCount}</p>
        <p><b>Slide Count:</b> ${presentation.slideCount}</p>
        <p><b>Creation Date:</b> ${presentation.creationDate}</p>
        <p><b>Last Modified:</b> ${presentation.lastModified}</p>
        <a href="${presentation.downloadLink}" download>Download File</a>
      </section>
    `;

    resultsContainer.innerHTML += html;
  });
}
