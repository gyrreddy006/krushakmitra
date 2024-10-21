function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'flex';

    // Add transition effect
    selectedPage.style.opacity = 0; // Start hidden
    setTimeout(() => {
        selectedPage.style.opacity = 1; // Fade in
    }, 10);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
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
                <strong style="font-size: 24px;">Temperature:</strong> <strong>${temp}°F</strong><br>
                <strong style="font-size: 24px;">Weather:</strong> <strong>${weather}</strong><br>
                <strong style="font-size: 24px;">Humidity:</strong> <strong>${humidity}%</strong>
            `;
        })
        .catch(error => {
            document.getElementById('climate-data').textContent = "Error fetching climate data. " + error.message;
        });
}
