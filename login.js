// This file is ready for your JavaScript code.
// You can add functionality like:
// 1. Form validation (e.g., check if passwords match, email format is correct).
// 2. Handling form submission to an API.
// 3. Toggling password visibility.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
        // Prevent the default form submission for now.
        event.preventDefault(); 
        
        // Example: Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
            alert('Please fill out all required fields.');
            return;
        }

        console.log('Form submitted!');
        console.log('Name:', name);
        console.log('Email:', email);
        
        // Here you would typically send the data to a server.
            // e.g., fetch('/api/login', { method: 'POST', body: ... })
        window.location.href = "main.html"; // <-- Redirect to main page
    });
});