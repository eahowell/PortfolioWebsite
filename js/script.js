document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.getElementById('status-message');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear any previous status messages
    statusMessage.style.display = 'none';
    statusMessage.textContent = '';
    
    // Disable the submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    try {
      // Log the request details for debugging
      console.log('Sending request to:', 'https://q37cl062se.execute-api.us-east-2.amazonaws.com/contact');
      console.log('Request payload:', formData);

      const response = await fetch('https://q37cl062se.execute-api.us-east-2.amazonaws.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Log the response for debugging
      console.log('Response status:', response.status);
      const responseData = await response.text();
      console.log('Response data:', responseData);

      if (response.ok) {
        // Show success message
        statusMessage.className = 'status-message success';
        statusMessage.textContent = 'Message sent successfully!';
        form.reset();
      } else {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      // Show error message
      statusMessage.className = 'status-message error';
      statusMessage.textContent = `Failed to send message: ${error.message}. Please try again.`;
    } finally {
      // Show the status message
      statusMessage.style.display = 'block';
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});