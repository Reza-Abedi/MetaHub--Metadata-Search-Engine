// Declare a new function named search
async function search() {
  // Read the user input from the term field in the form searchForm
  let searchTerm = document.forms.searchForm.term.value;
  // Read the searchType
  let searchType = document.forms.searchForm.searchType.value;
  console.log(searchType);

  // Read the selected duration search option
  let durationSearchRadio = document.querySelector('input[name="durationSearch"]:checked');
  let durationSearch = durationSearchRadio ? durationSearchRadio.value : 'all'; // Default to 'all'

  // Read the selected sorting option
  let sortOption = document.forms.searchForm.sortOption.value;

  // Read the JSON
  let rawData = await fetch(`/api/music/${searchTerm}/${searchType}/${durationSearch}`);
  // Convert JSON to a JavaScript data structure
  let songs = await rawData.json();

  // Sort the songs based on the selected option
  if (sortOption === 'asc') {
    songs.sort((a, b) => {
      const nameA = (a.musicDescription.common.title || 'Unknown Title').toUpperCase();
      const nameB = (b.musicDescription.common.title || 'Unknown Title').toUpperCase();
      return nameA.localeCompare(nameB);
    });
  } else if (sortOption === 'desc') {
    songs.sort((a, b) => {
      const nameA = (a.musicDescription.common.title || 'Unknown Title').toUpperCase();
      const nameB = (b.musicDescription.common.title || 'Unknown Title').toUpperCase();
      return nameB.localeCompare(nameA);
    });
  }

  // Create a variable name that initially is an empty string
  let html = `
    <section class="searchInfo">
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${songs.length} songs.</p>
    </section>
  `;

  // Check if there are any search results
  if (songs.length > 0) {
    html += `
      <table class="searchResults">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Loop through the found songs
    for (let song of songs) {
      // Access specific properties within musicDescription
      let musicName = song.musicDescription.common.title || 'Unknown Title';
      let artistName = song.musicDescription.common.artist || 'Unknown Artist';
      let albumName = song.musicDescription.common.album || 'Unknown Album';

      html += `
        <tr>
          <td>${musicName}</td>
          <td>${artistName}</td>
          <td>${albumName}</td>
          <td>${song.musicDescription.format.duration}</td>
          <td>
            <audio controls>
              <source src="music/${song.musicName}" type="audio/mpeg">
              Your browser does not support the audio tag.
            </audio>
          </td>
        </tr>
      `;
    }

    html += `
        </tbody>
      </table>
    `;
  } else {
    // If no results, display a message
    html += '<p class="resultMessage">No results found.</p>';
  }

  // Grab the element/tag with the class content
  let contentElement = document.querySelector('.content');
  // Change the content of the content element
  contentElement.innerHTML = html;

  // Set the value of the search input field to the current search term
  document.forms.searchForm.term.value = searchTerm;
}
