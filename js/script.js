document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.getElementById('status-message');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    statusMessage.style.display = 'none';
    statusMessage.textContent = '';
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
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

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed response:', responseData);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid response from server');
      }
      
      // Check if we have a successful response with a message
      if (response.ok && responseData.message === 'Email sent successfully') {
        statusMessage.className = 'status-message success';
        statusMessage.textContent = 'Message sent successfully!';
        form.reset();
      } else {
        // If we have an error message in the response, use it
        const errorMsg = responseData.message || 'Failed to send message';
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Error details:', error);
      statusMessage.className = 'status-message error';
      statusMessage.textContent = error.message || 'Failed to send message. Please try again.';
    } finally {
      statusMessage.style.display = 'block';
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
});