//second javascript file
// Function to handle form submission
function saveFormInputToFile(event) {
    
    // Get the form input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

}

// Attach the handleFormSubmit function to the form's submit event
document.getElementById('signupForm').addEventListener('submit', saveFormInputToFile);
