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
      console.log('Sending form data:', formData);
      
      const response = await fetch('https://q37cl062se.execute-api.us-east-2.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid response from server');
      }
      
      // Check both the wrapper response and the inner response
      const actualStatusCode = responseData.statusCode || response.status;
      const actualMessage = responseData.body ? JSON.parse(responseData.body).message : responseData.message;
      
      if (actualStatusCode === 200) {
        // Show success message
        statusMessage.className = 'status-message success';
        statusMessage.textContent = actualMessage || 'Message sent successfully!';
        form.reset();
      } else {
        throw new Error(actualMessage || `Failed to send message (${actualStatusCode})`);
      }
    } catch (error) {
      console.error('Error details:', error);
      // Show error message
      statusMessage.className = 'status-message error';
      statusMessage.textContent = error.message || 'Failed to send message. Please try again.';
    } finally {
      // Show the status message
      statusMessage.style.display = 'block';
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});