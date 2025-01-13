// Add this to your script.js file
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.getElementById('status-message');

  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Disable the submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Get form data
      const formData = {
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value
      };

      try {
          const response = await fetch('https://q37cl062se.execute-api.us-east-2.amazonaws.com/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
console.log(response);
          if (response.ok) {
              // Show success message
              statusMessage.className = 'status-message success';
              statusMessage.textContent = 'Message sent successfully!';
              statusMessage.style.display = 'block';
              form.reset();
          } else {
              throw new Error('Failed to send message');
          }
      } catch (error) {
          // Show error message
          statusMessage.className = 'status-message error';
          statusMessage.textContent = 'Failed to send message. Please try again.';
          statusMessage.style.display = 'block';
      } finally {
          // Re-enable the submit button
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
      }
  });
});

