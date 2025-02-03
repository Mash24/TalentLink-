// Form Validation for the register page of JobMatch Pro using JavaScript

// Function to check for sequential characters (e.g., "123")
function hasSequentialCharacters(password) {
    const commonSequences = ["123", "abc"];

    for (let seq of commonSequences){
        for (let i = 0; i <seq.length - 2; i++) {
            if (password.toLowerCase().includes(seq.substring(i, i + 3))) {
                return true; // Sequential characters found
        }
    }
}
return false; // No sequential characters found
}


// // Function to check for repeated patterns (e.g., "aaaa", "ababab", "1111")
function hasRepeatedPatterns(password) {
    return /^(.)\1{2}/.test(password); // Regular expression pattern for repeated patterns
}

//function to validate password strength
function validatePassword() {
    function validatePassword () {
        let checklist = document.querySelectorAll(".checklist li"); // Get all list items within the checklist class
        let password = passEl.value; // Get the value of the password input
        let username = usernameEl.value.toLowerCase();
        let email = emailEl.value.split("@")[0].toLowerCase(); // 
        let confirmPassword = confirm_passEl.value;
        
        let conditions = [
            {test: /[a-z]/.test(password), index: 0}, // Lowercase letters
            {test: /[A-Z]/.test(password), index: 1}, 
            {test: /[0-9]/.test(password), index: 2},
            {test: /[\W_]/.test(password), index: 3}, //Special characters
            {test: password.length >= 8, index: 4}, // Minimum length of 8 characters
            {test: !hasSequentialCharacters(password), index: 5}, // No sequential characters
            {test: password === confirmPassword && confirmPassword !== "", index: 6}, // Mathches confirm password
            {test: !/\s/.test(password), index: 7}, // No spaces allowed
            {test: !hasRepeatedPatterns(password), index: 8}, // No repeated patterns
            {test: !password.toLowerCase().includes(username) && !password.toLowerCase().includes(email), index: 9}, // Password should not contain username
        ];

        conditions.forEach(({test, index}) => checklist.toggle("valid", test)); 

        return conditions.every(({test}) => test); // Return true if all conditions are met, otherwise false
}


// /////////////////////////////////////////////////////////////////////////////////

// Declare variables for DOM elements  globally to avoid re-declaration errors and improve performance

let formEl, nameEl, emailEl, passEl, confirm_passEl, genderEl, dobEl, registerButtonEl, usernameEl;

document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables when the DOM content has loaded
    formEl = document.getElementById("registerForm"); // Get the form
    nameEl = document.getElementById("name"); // Get the full name
    emailEl = document.getElementById("email"); //Get email element
    passEl = document.getElementById("pass"); // Get password element
    confirm_passEl = document.getElementById("confirm_pass");
    genderEl = document.getElementById("gender");
    dobEl = document.getElementById("dob");
    registerButtonEl = document.getElementById("registerButton");
    usernameEl = document.getElementById("username"); // Get username element

    // Event listeners for input fields after the above declaration and initialization to ensure they're available
    // Event listener for password input change to trigger password validation and update UI in real-time as the user types

// Listen for input changes
passEl.addEventListener("input", validatePassword);
confirm_passEl.addEventListener("input", validatePassword);

// Event listener for form submission
    // prevent form submission if any of these conditions are met
    formEl.addEventListener("submit", (event) => {
        if(!validatePassword()){
            event.preventDefault(); // Prevent form submission if validation fails
            alert("Please fix the password issues before submitting the form."); // Alert user about validation failures
        }
     });
});

// Utility function to show error messages 
function showError(input, message) {
    const errorMessage = input.nextElementSibling; // Get the next sibling (error message)
    input.style.border = "2px solid red"; // Add a border around the input field to indicate an error
    errorMessage.style.display = "block"; // Display the error message
    errorMessage.style.color = "red"; // Show the error message
    errorMessage.textContent = message; 
}

// Utility function to remove or clear the error messages
function clearError(input) {
    const errorMessage = input.nextElementSibling; // Get the next sibling (error message)
    input.style.border = "2px solid var(--primary-color)"; // 
    errorMessage.textContent = ""; // 
}

// Function to validate email format using regular expression
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Fix: Define regex properly
    if (!emailRegex.test(email.value.trim())) { 
        showError(email, "Enter a valid email e.g example@domain.com.");
        return false;
    } else {
        clearError(email);
        return true;
    }
}

// Function to toggle password visibility


//---------------------This password validation section is done, focus with the validation parts above it----------------------

// Function to validate password strength
// let validateBox = document.querySelector(".pass");

// let checklist = document.querySelector(".checklist").getElementsByTagName("li");
// let lowerCount = 0, numberCount = 0, upperCount = 0; 

// let icon = document.querySelector(".icon");
// let show = true; 

// //show and hide password
// icon.addEventListener("click", () => {
//     if(show){
//         passEl.type = "text";
//         show = false; 
//     } else{
//         passEl.type = "password";
//         show= true;
//     }
//     icon.querySelector(".show").classList.toggle("hide");
//     icon.querySelector(".slash").classList.toggle("hide")
// });


//---------------------Confirm password validation in progress----------------------
// Function to check for consecutive numbers in the password

function hasConsecutiveNumbers(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if(!isNaN(password[i]) && !isNaN(password[i + 1])) {
            if(parseInt(password[i]) + 1 === parseInt(password[i+1])) {
                return true; // Consecutive numbers found
            }
    }
}
return false; // No consecutive numbers found
}


// ----------------------------------------------------------------------

// Function to validate password strength
function validatePassword () {
    let checklist = document.querySelectorAll(".checklist li"); // Get all list items within the checklist class
    let password = passEl.value; // Get the value of the password input
    let username = usernameEl.value.toLowerCase();
    let email = emailEl.value.split("@")[0].toLowerCase(); // 
    let confirmPassword = confirm_passEl.value;

    let lowerCase = /[a-z]/.test(password);
    let upperCase = /[A-Z]/.test(password);
    let numbers = /[0-9]/.test(password);
    let specialChar = /[\W_]/.test(password); // None word characters
    let minLength = password.length >= 8;
    let matchPassword = password === confirmPassword && confirmPassword !== "";
    let noSpace = !/\s/.test(password);
    let noConsecutiveNumbers = !hasConsecutiveNumbers(password); // Check for consecutive numbers
    let noUsernameOrEmail = !password.toLowerCase().includes(username) && !password.toLowerCase().includes(email); // Check if password contains username or email


    checklist[0].classList.toggle("valid", lowerCase);
    checklist[1].classList.toggle("valid", upperCase);
    checklist[2].classList.toggle("valid", numbers);
    checklist[3].classList.toggle("valid", specialChar);
    checklist[4].classList.toggle("valid", minLength);
    checklist[5].classList.toggle("valid", noConsecutiveNumbers);
    checklist[6].classList.toggle("valid", matchPassword);
    checklist[7].classList.toggle("valid", noSpace);
    checklist[8].classList.toggle("valid", noUsernameOrEmail);

    return [...checklist].every(li => li.classList.contains("valid")); // Return true if all checklist items have the 'valid' class, otherwise false
}