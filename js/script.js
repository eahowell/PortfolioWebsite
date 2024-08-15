(function () {
  let form = document.getElementById("contact-form");
  let emailInput = document.getElementById("RequestorEmail");
  let phoneInput = document.getElementById("RequestorPhone");

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Check and Remove any existing errors
    let error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }

    // Now add the error if the message isn’t empty
    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let email = emailInput.value;
    let hasAtSign = email.indexOf("@") > -1;
    let hasDotAfterAtSign = email.indexOf(".", email.indexOf("@")) > -1;

    if (!email) {
      showErrorMessage(emailInput, "Email is a required field.");
      return false;
    }

    if (!hasAtSign) {
      showErrorMessage(emailInput, "You must enter a valid email address.");
      return false;
    }

    if (!hasDotAfterAtSign) {
      showErrorMessage(emailInput, "You must enter a valid email address.");
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePhone() {
    let Phone = phoneInput.value;
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var match = regex.test(Phone);
    if (!Phone) {
      showErrorMessage(phoneInput, "Phone Number is a required field.");
      return false;
    }

    if (match) {
      showErrorMessage(
        phoneInput,
        "The Phone umber needs to match the pattern 999-999-9999."
      );
      return false;
    }

    showErrorMessage(phoneInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPhone = validatePhone();
    return isValidEmail && isValidPhone;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert("Success!");
    }
  });

  emailInput.addEventListener("input", validateEmail);
  phonePhone.addEventListener("input", validatePhone);
  // THE RETURN STATEMENT HERE
  // Loading messages
  function showLoadingMessage() {
    $("#loader").addClass("visible");
  }
  function hideLoadingMessage() {
    $("#loader").addClass("invisible");
  }
  function showDetails() {
    showLoadingMessage();
    showModal(pokemon.name, pokemon);
  }
})();
