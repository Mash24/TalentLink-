document.addEventListener("DOMContentLoaded", function() {
    const formEl = document.getElementById("loginForm");
    const usernameEl = document.getElementById("user");
    const passwordEl = document.getElementById("pass");

    formEl.addEventListener("submit", function (event) {
        let valid = true // Flag to check if form is valid

        // Clear previous error message
        document.querySelectorAll(".error-message").forEach (error => error.textContent = "");

        // Username validation
        if (usernameEl.value.trim().length < 3) {
            showError(usernameEl, "Username must be at least 3 characters.");
            valid = false;
        }

        // Password validation
        if (passwordEl.value.length < 6) {
            showError(passwordEl, "Password must be at least 6 characters.");
            valid = false;
        }

        // Prevent form submission if validation fails
        if (!valid) {
            event.preventDefault();
        }
    });

    // Function to display error messages
    function showError(input, message) {
        const errorText = input.nextElementSibling; // Select <small> tag. Get the next sibling element which contains the error text
        errorText.textContent = message;
        errorText.style.color = "red";
        errorText.style.fontSize = "12px";
        errorText.style.marginTop = "5px";
    }
});