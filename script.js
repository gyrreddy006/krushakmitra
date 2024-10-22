function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.opacity = 0;
        setTimeout(() => page.style.display = 'none', 300); // Wait for the opacity transition to complete
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block';

    // Add transition effect for fading in
    setTimeout(() => {
        selectedPage.style.opacity = 1;
    }, 10); // Small delay to ensure display change happens first
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = 0; // Start fade-out
    setTimeout(() => modal.style.display = 'none', 300); // Hide after fade-out completes
}

async function getClimate() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert("Please enter a location!");
        return; // Stop if the input is empty
    }
    
    const apiKey = 'YOUR_API_KEY'; // Use your Visual Crossing API key
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Location not found. Please try another.");
        }
        const data = await response.json();
        const temp = data.currentConditions.temp;
        const weather = data.currentConditions.conditions;
        const humidity = data.currentConditions.humidity;

        document.getElementById('climate-data').innerHTML = `
            <strong style="font-size: 24px;">Temperature:</strong> <strong>${temp}°F</strong><br>
            <strong style="font-size: 24px;">Weather:</strong> <strong>${weather}</strong><br>
            <strong style="font-size: 24px;">Humidity:</strong> <strong>${humidity}%</strong>
        `;
    } catch (error) {
        document.getElementById('climate-data').textContent = "Error fetching climate data. " + error.message;
    }
}
