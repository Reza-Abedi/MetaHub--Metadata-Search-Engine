document.getElementById('searchForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput').value;

  try {
      const response = await fetch(`/search?query=${encodeURIComponent(searchInput)}`);
      const result = await response.json();

      displayResults(result);
  } catch (error) {
      console.error('Error fetching search results:', error);
  }
});

function displayResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  if (results.length === 0) {
      searchResults.innerHTML = 'No results found.';
      return;
  }

  const resultList = document.createElement('ul');
  results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = result.title; // Change this to the appropriate property from your metadata
      resultList.appendChild(listItem);
  });

  searchResults.appendChild(resultList);
}
