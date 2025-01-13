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
// (function () {
//   let form = document.getElementById("contact-form");
//   let emailInput = document.getElementById("RequestorEmail");
//   let phoneInput = document.getElementById("RequestorPhone");

//   function showErrorMessage(input, message) {
//     let container = input.parentElement; // The .input-wrapper

//     // Check and Remove any existing errors
//     let error = container.querySelector(".error-message");
//     if (error) {
//       container.removeChild(error);
//     }

//     // Now add the error if the message isn’t empty
//     if (message) {
//       let error = document.createElement("div");
//       error.classList.add("error-message");
//       error.innerText = message;
//       container.appendChild(error);
//     }
//   }

//   function validateEmail() {
//     let email = emailInput.value;
//     let hasAtSign = email.indexOf("@") > -1;
//     let hasDotAfterAtSign = email.indexOf(".", email.indexOf("@")) > -1;

//     if (!email) {
//       showErrorMessage(emailInput, "Email is a required field.");
//       return false;
//     }

//     if (!hasAtSign) {
//       showErrorMessage(emailInput, "You must enter a valid email address.");
//       return false;
//     }

//     if (!hasDotAfterAtSign) {
//       showErrorMessage(emailInput, "You must enter a valid email address.");
//       return false;
//     }

//     showErrorMessage(emailInput, null);
//     return true;
//   }

//   function validatePhone() {
//     let Phone = phoneInput.value;
//     var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     var match = regex.test(Phone);
//     if (!Phone) {
//       showErrorMessage(phoneInput, "Phone Number is a required field.");
//       return false;
//     }

//     if (match) {
//       showErrorMessage(
//         phoneInput,
//         "The Phone umber needs to match the pattern 999-999-9999."
//       );
//       return false;
//     }

//     showErrorMessage(phoneInput, null);
//     return true;
//   }

//   function validateForm() {
//     let isValidEmail = validateEmail();
//     let isValidPhone = validatePhone();
//     return isValidEmail && isValidPhone;
//   }

//   form.addEventListener("submit", (e) => {
//     e.preventDefault(); // Do not submit to the server
//     if (validateForm()) {
//       alert("Success!");
//     }
//   });

//   emailInput.addEventListener("input", validateEmail);
//   phonePhone.addEventListener("input", validatePhone);
//   // THE RETURN STATEMENT HERE
//   // Loading messages
//   function showLoadingMessage() {
//     $("#loader").addClass("visible");
//   }
//   function hideLoadingMessage() {
//     $("#loader").addClass("invisible");
//   }
//   function showDetails() {
//     showLoadingMessage();
//     showModal(pokemon.name, pokemon);
//   }
// })();
