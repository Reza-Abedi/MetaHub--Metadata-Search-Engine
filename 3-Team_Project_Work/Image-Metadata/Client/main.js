// main.js

async function searchMetadata() {
  const searchTerm = document.getElementById('searchInput').value;
  const searchType = document.getElementById('searchType').value;

  const response = await fetch(`/api/search/${searchTerm}/${searchType}`);
  const data = await response.json();

  displayResults(data);
}

async function displayResults(data) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = '';

  if (data.length === 0) {
      resultContainer.textContent = 'No results found.';
      return;
  }

  const table = document.createElement('table');
  table.classList.add('resultTable');

  const headerRow = document.createElement('tr');
  const headerColumns = ['Name', 'Make', 'Model', 'Latitude', 'Longitude', 'CreateDate', 'Orientation', 'Width', 'Height', 'Image Preview'];
  
  headerColumns.forEach(columnName => {
      const headerCell = document.createElement('th');
      headerCell.textContent = columnName;
      headerRow.appendChild(headerCell);
  });

  table.appendChild(headerRow);

  data.forEach(item => {
      const row = document.createElement('tr');

      const metadataColumns = ['imageName', 'Make', 'Model', 'latitude', 'longitude', 'CreateDate', 'Orientation', 'ExifImageWidth', 'ExifImageHeight'];
      
      metadataColumns.forEach(column => {
          const cell = document.createElement('td');
          if (column === 'CreateDate' && item.imageDescription[column]) {
              const createDate = new Date(item.imageDescription[column]);
              cell.textContent = createDate.toLocaleString();
          } else {
              cell.textContent = column === 'imageName' ? (item[column] || '') : (item.imageDescription[column] || '');
          }
          row.appendChild(cell);
      });

      // Display image preview
      const imageCell = document.createElement('td');
      const imageFileName = item.imageName;
      const imageLink = document.createElement('a');
            // Display image preview with latitude & longitude (Resolve by Shiva)
      imageLink.setAttribute("href",`https://maps.google.com/?q=${item.imageDescription.latitude},${item.imageDescription.longitude}`); 
      imageLink.setAttribute("target","_blank");
      const imagePath = `/images/${imageFileName}`;
      const imagePreview = document.createElement('img');
      imagePreview.src = imagePath;
      imagePreview.alt = 'Image Preview';
      imageCell.appendChild(imageLink);
      imageLink.appendChild(imagePreview);
      row.appendChild(imageCell);

      table.appendChild(row);
  });

  resultContainer.appendChild(table);
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchMetadata);
