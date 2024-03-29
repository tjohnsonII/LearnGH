// Function to save form data to the database
function saveToDatabase(formData) {
    fetch('/saveFormData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save form data to the database');
        }
        console.log('Form data saved to the database successfully');
    })
    .catch(error => {
        console.error('Error saving form data to the database:', error);
    });
}


