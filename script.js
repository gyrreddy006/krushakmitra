function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Show modal and set content
    const modalPage = document.getElementById('modal-page');
    modalPage.innerHTML = document.getElementById(pageId).innerHTML;

    // Show modal with a fade-in effect
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1; // Fade-in effect
    }, 10); // Small timeout to allow the display change to take effect

    // Optional: Add a close functionality when clicking outside of the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = 0; // Fade-out effect
    setTimeout(() => {
        modal.style.display = 'none'; // Hide the modal after fade-out
    }, 300); // Time to match the fade-out duration
}

function getClimate() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert("Please enter a location!");
        return; // Stop if the input is empty
    }

    const apiKey = '5SEG32LPTE5AKS4V775ATQ7RP'; // Use your Visual Crossing API key
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=${apiKey}&contentType=json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Location not found: ${response.statusText}`);
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
            document.getElementById('climate-data').textContent = "Error fetching climate data: " + error.message;
        });
}
