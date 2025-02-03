// Function to check for sequential characters (e.g., "123", "abc")
function hasSequentialCharacters(password) {
    let alphabets = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";

    password = password.toLowerCase();

    for (let i = 0; i < password.length - 2; i++) {
        let substr = password.substring(i, i + 3);

        if (alphabets.includes(substr) || numbers.includes(substr)) {
            return true; // Found sequential characters
        }
    }
    return false;
}

// Function to check for repeated patterns (e.g., "aaaa", "ababab", "1111")
function hasRepeatedPatterns(password) {
    return /^(.)\1{2}/.test(password); // Fixed regex pattern
}

// Function to check for consecutive numbers (e.g., "12", "34")
function hasConsecutiveNumbers(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (!isNaN(password[i]) && !isNaN(password[i + 1])) {
            if (parseInt(password[i]) + 1 === parseInt(password[i + 1])) {
                return true; // Consecutive numbers found
            }
        }
    }
    return false; // No consecutive numbers found
}

// Function to validate password strength
function validatePassword() {
    let checklist = document.querySelectorAll(".checklist li");
    let password = passEl.value;
    let username = usernameEl.value.toLowerCase();
    let email = emailEl.value.split("@")[0].toLowerCase();
    let confirmPassword = confirm_passEl.value;

    let conditions = [
        { test: /[a-z]/.test(password), index: 0 }, // Lowercase letters
        { test: /[A-Z]/.test(password), index: 1 }, // Uppercase letters
        { test: /[0-9]/.test(password), index: 2 }, // Numbers
        { test: /[\W_]/.test(password), index: 3 }, // Special characters
        { test: password.length >= 8, index: 4 }, // Minimum length of 8 characters
        { test: !hasSequentialCharacters(password), index: 5 }, // No sequential characters
        { test: password === confirmPassword && confirmPassword !== "", index: 6 }, // Matches confirm password
        { test: !/\s/.test(password), index: 7 }, // No spaces allowed
        { test: !hasRepeatedPatterns(password), index: 8 }, // No repeated patterns
        { test: !password.toLowerCase().includes(username) && !password.toLowerCase().includes(email), index: 9 }, // No username/email in password
    ];

    conditions.forEach(({ test, index }) => {
        checklist[index].classList.toggle("valid", test);
    });

    return conditions.every(({ test }) => test); // Returns true only if all conditions are met
}

// Global Variables (Declared Once)
let formEl, nameEl, emailEl, passEl, confirm_passEl, genderEl, dobEl, registerButtonEl, usernameEl;

// Wait for DOM to load before initializing elements
document.addEventListener("DOMContentLoaded", function () {
    formEl = document.getElementById("registerForm");
    nameEl = document.getElementById("name");
    emailEl = document.getElementById("email");
    passEl = document.getElementById("pass");
    confirm_passEl = document.getElementById("confirm_pass");
    genderEl = document.getElementById("gender");
    dobEl = document.getElementById("dob");
    registerButtonEl = document.getElementById("registerButton");
    usernameEl = document.getElementById("username");

    // Event listeners for input fields
    passEl.addEventListener("input", validatePassword);
    confirm_passEl.addEventListener("input", validatePassword);

    // Prevent form submission if password validation fails
    formEl.addEventListener("submit", function (event) {
        if (!validatePassword()) {
            event.preventDefault(); // Stop form submission
            alert("Please fix the password issues before submitting.");
        }
    });
});

// Function to show error messages
function showError(input, message) {
    let errorMessage = input.nextElementSibling; // Get next sibling (error message)
    input.style.border = "2px solid red";
    errorMessage.style.display = "block";
    errorMessage.style.color = "red";
    errorMessage.textContent = message;
}

// Function to clear error messages
function clearError(input) {
    let errorMessage = input.nextElementSibling;
    input.style.border = "2px solid var(--primary-color)";
    errorMessage.textContent = "";
}

// Function to validate email format
function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Enter a valid email e.g example@domain.com.");
        return false;
    } else {
        clearError(email);
        return true;
    }
}

