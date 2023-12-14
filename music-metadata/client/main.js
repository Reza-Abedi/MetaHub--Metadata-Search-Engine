// Declare a new function named search
async function search() {
  // read the user input from the term field in the form searchForm
  let searchTerm = document.forms.searchForm.term.value;
  // read the searchType
  let searchType = document.forms.searchForm.searchType.value;
  console.log(searchType);
  // empty the input field
  document.forms.searchForm.term.value = '';
  // read the JSON
  let rawData = await fetch(`/api/music/${searchTerm}/${searchType}`);
  // convert JSON to a JavaScript data structure
  let songs = await rawData.json();
  // create a variable name that initially is an empty string
  let html = `
    <p>Du sökte efter "${searchTerm}"...</p>
    <p>Hittade ${songs.length} låtar.</p>
  `;
  // loop through the found songs
  for (let song of songs) {
    html += `
      <section>
        <h2>${song.musicName}</h2>
        <p><b>Music Description:</b> ${song.musicDescription}</p>
        <p>
          <audio controls src="music/${song.musicId}">
        </p>
      </section>
    `;
  }
  // Grab the element/tag with the class searchResults
  let searchResultsElement = document.querySelector('.searchResults');
  // Change the content of the searchResults element
  searchResultsElement.innerHTML = html;
}
