// This file adds basic validation to the sign-up form.

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', (event) => {
        // Prevent the default form submission to handle it with JavaScript.
        event.preventDefault(); 
        
        // Get the values from the form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Simple validation: check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return; // Stop the function if passwords don't match
        }
        
        // Check if any field is empty (though 'required' attribute handles this)
        if (!name || !email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        // If validation passes, log the data and show a success message
        console.log('Form submitted successfully!');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password); // In a real app, NEVER log passwords.
        
        alert('Account for ' + name + ' created successfully! (This is a demo)');
        
        // Here, you would typically send the data to a server API to create the user.
        // e.g., fetch('/api/register', { method: 'POST', body: ... })
        alert('Account for ' + name + ' created successfully! (This is a demo)');
        // Redirect through welcome flow
        window.location.href = "welcome.html";

    });
});