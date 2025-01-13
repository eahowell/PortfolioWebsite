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
      const response = await fetch('https://q37cl062se.execute-api.us-east-2.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      
      if (response.ok) {
        // Show success message
        statusMessage.className = 'status-message success';
        statusMessage.textContent = responseData.message || 'Message sent successfully!';
        form.reset();
      } else {
        throw new Error(responseData.message || `Failed to send message (${response.status})`);
      }
    } catch (error) {
      console.error('Error:', error);
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