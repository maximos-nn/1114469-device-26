var contactLink = document.querySelector(".index-info-contacts .button");
var feedback = document.querySelector(".modal-feedback");
var feedbackCloseButton = feedback.querySelector(".button-close");
var feedbackForm = feedback.querySelector(".feedback-form");
var nameField = feedbackForm.querySelector("[name=name]");
var emailField = feedbackForm.querySelector("[name=email]");
var messageField = feedbackForm.querySelector("[name=message]");

var isStorageSupported = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (error) {
  isStorageSupported = false;
}

contactLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedback.classList.add("modal-show");
  if (storageName && storageEmail) {
    nameField.value = storageName;
    emailField.value = storageEmail;
    messageField.focus();
  } else {
    if (storageName) {
      nameField.value = storageName;
      emailField.focus();
    } else {
      emailField.value = storageEmail;
      nameField.focus();
    }
  }
});

feedbackCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedback.classList.remove("modal-show");
  feedback.classList.remove("modal-error");
});

feedbackForm.addEventListener("submit", function (evt) {
  if (!(nameField.value && emailField.value && messageField.value)) {
    evt.preventDefault();
    feedback.classList.remove("modal-error");
    feedback.offsetWidth = feedback.offsetWidth;
    feedback.classList.add("modal-error");
  } else {
    if (isStorageSupported) {
      localStorage.setItem("name", nameField.value);
      localStorage.setItem("email", emailField.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (feedback.classList.contains("modal-show")) {
      feedback.classList.remove("modal-show");
      feedback.classList.remove("modal-error");
    }
  }
});
