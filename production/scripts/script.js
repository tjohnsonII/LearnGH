function saveFormInputToFile() {
    // Get the form input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Construct the JSON payload
    var formData = {
        username: username,
        email: email,
        password: password
    };

    // Send an HTTP POST request to the server to save the form data
    fetch('/saveFormData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save form data');
        }
        return response.blob();
    })
    .then(blob => {
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
    })
    .catch(error => {
        console.error('Error saving form data:', error);
    });
}
