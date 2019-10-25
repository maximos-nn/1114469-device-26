var contactLink = document.querySelector(".index-info-contacts .button");
var feedback = document.querySelector(".modal-feedback");
var feedbackCloseButton = feedback.querySelector(".button-close");
var feedbackForm = feedback.querySelector(".feedback-form");
var nameField = feedbackForm.querySelector("[name=name]");
var emailField = feedbackForm.querySelector("[name=email]");
var messageField = feedbackForm.querySelector("[name=message]");

var mapLink = document.querySelector(".map-mini");
var map = document.querySelector(".modal-map");
var mapCloseButton = map.querySelector("button");

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

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.add("modal-show");
});

feedbackCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedback.classList.remove("modal-show");
  feedback.classList.remove("modal-error");
});

mapCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.remove("modal-show");
})

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
    if (map.classList.contains("modal-show")) {
      map.classList.remove("modal-show");
    }
  }
});


function addControlHandler(
  controlsList,
  contentList,
  index,
  contentClassName,
  controlClassName
  )
  {
  controlsList[index].addEventListener("click", function () {
    for (var i = 0; i < contentList.length; i++) {
      controlsList[i].classList.remove(controlClassName);
      contentList[i].classList.remove(contentClassName);
    }
    controlsList[index].classList.add(controlClassName);
    contentList[index].classList.add(contentClassName);
  });
}

var servicesControls = document.querySelectorAll(".services-controls button");
var servicesContent = document.querySelector(".services-content").children;

for (var i = 0; i < servicesControls.length; i++) {
  addControlHandler(
    servicesControls,
    servicesContent,
    i,
    "services-content-active",
    "button-active"
    );
}

var favControls = document.querySelectorAll(".popular-controls button");
var favContent = document.querySelectorAll(".popular-list li");

for (var i = 0; i < favControls.length; i++) {
  addControlHandler(
    favControls,
    favContent,
    i,
    "popular-item-active",
    "popular-controls-active"
    );
}
