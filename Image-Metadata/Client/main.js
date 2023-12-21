// main.js

async function searchMetadata() {
    const searchTerm = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;

    // Get latitude and longitude values from input fields
    const latitude = document.getElementById('latitudeInput').value;
    const longitude = document.getElementById('longitudeInput').value;

    try {
        // Construct the URL based on search parameters
        let apiUrl = `/api/search/${searchTerm}/${searchType}`;

        // Add latitude and longitude to the URL if available
        if (latitude !== '' && longitude !== '') {
            apiUrl += `?latitude=${latitude}&longitude=${longitude}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
            displayResults(data);
        } else {
            // Handle case when no results are found
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

async function displayResults(data) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    data.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('resultItem');

        const metadataDetails = document.createElement('p');
        metadataDetails.textContent = `Name: ${item.imageName}, Make: ${item.imageDescription.Make}, Model: ${item.imageDescription.Model}`;

        // Display latitude and longitude if available
        if (item.imageDescription.latitude !== undefined && item.imageDescription.longitude !== undefined) {
            metadataDetails.textContent += `, Latitude: ${item.imageDescription.latitude}, Longitude: ${item.imageDescription.longitude}`;
        }

        resultDiv.appendChild(metadataDetails);

        // Construct image path using the imageName field
        const imageFileName = item.imageName;
        const imagePath = `/images/${imageFileName}`;

        const imagePreview = document.createElement('img');
        imagePreview.src = imagePath;
        imagePreview.alt = 'Image Preview';
        resultDiv.appendChild(imagePreview);

        resultContainer.appendChild(resultDiv);
    });
}
