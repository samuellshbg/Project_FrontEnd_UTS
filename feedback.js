// Function to handle feedback form submission
document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting normally
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && phone && email && message) {
                alert('Thank you for your feedback, ' + name + '!');
                // Here you can add the code to send the feedback to your server

                // Clear the form after submission
                feedbackForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
