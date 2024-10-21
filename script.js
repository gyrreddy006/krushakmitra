function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');

  // Show the selected page
  document.getElementById(pageId).style.display = 'block';
}

function getClimate() {
  const location = document.getElementById('location').value;
  if (!location) {
    alert("Please enter a location!");
    return; // Stop if the input is empty
  }
  
  const apiKey = '5SEG32LPTE5AKS4V775ATQ7RP'; // Use your Visual Crossing API key
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${apiKey}&contentType=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found. Please try another.");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.currentConditions.temp;
      const weather = data.currentConditions.conditions;
      const humidity = data.currentConditions.humidity;

      document.getElementById('climate-data').innerHTML = `
        <strong>Temperature:</strong> ${temp}°F<br>
        <strong>Weather:</strong> ${weather}<br>
        <strong>Humidity:</strong> ${humidity}%
      `;
    })
    .catch(error => {
      document.getElementById('climate-data').textContent = "Error fetching climate data. " + error.message;
    });
}
