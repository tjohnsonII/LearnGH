function saveFormInputToFile() {
    // Get the form input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Construct the text content
    var textContent = "Username: " + username + "\n" +
                      "Email: " + email + "\n" +
                      "Password: " + password;

    // Create a Blob containing the text content
    var blob = new Blob([textContent], { type: 'text/plain' });

    // Create a temporary anchor element
    var a = document.createElement('a');
    a.download = 'form_data.txt';
    a.href = window.URL.createObjectURL(blob);

    // Append the anchor element to the body and click it programmatically
    document.body.appendChild(a);
    a.click();

    // Remove the anchor element and revoke the object URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
}
