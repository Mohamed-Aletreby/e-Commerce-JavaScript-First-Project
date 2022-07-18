// Selecting Sign Up Page Elements
const signupName = document.querySelector("#signup-name");
const signupEmail = document.querySelector("#signup-email");
const signupPassword = document.querySelector("#signup-password");
const signupButton = document.querySelector(".signup__button a");

// Set allUsersInformation[] array as undefined
let allUsersInformation;

// Check if localStorage Has Data or No
if (localStorage.getItem("usersInformation") === null) {
  allUsersInformation = [];
} else {
  allUsersInformation = JSON.parse(localStorage.getItem("usersInformation"));
}

// Name Validation
function signupNameValidation() {
  let signupNameRegex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
  if (signupNameRegex.test(signupName.value) === true) {
    return true;
  } else {
    return false;
  }
}

// Email Validation
function signupEmailValidation() {
  let signupEmailRegex = /^[A-Za-z0-9.]+@[A-Za-z]+\.[a-z]{2,3}$/;
  if (signupEmailRegex.test(signupEmail.value) === true) {
    return true;
  } else {
    return false;
  }
}

// Password Validation
function signupPasswordValidation() {
  let signupPasswordRegex = /^.{5,15}$/;
  if (signupPasswordRegex.test(signupPassword.value) === true) {
    return true;
  } else {
    return false;
  }
}

// All Sign up inputs Validation
function userInputsValidation() {
  if (
    signupNameValidation() === true &&
    signupEmailValidation() === true &&
    signupPasswordValidation() === true
  ) {
    return true;
  } else {
    return false;
  }
}

// this function check if the email that user is used to create account , not used before
function isExist() {
  if (allUsersInformation.length > 0) {
    for (let i = 0; i < allUsersInformation.length; i++) {
      if (
        allUsersInformation[i].theEmail.toLowerCase() ==
        signupEmail.value.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    }
  } else if (allUsersInformation.length == 0) {
    return false;
  }
}

function signup(e) {
  if (userInputsValidation() == true && isExist() == false) {
    let userInformation = {
      theName: signupName.value,
      theEmail: signupEmail.value,
      thePassword: signupPassword.value,
    };

    allUsersInformation.push(userInformation);

    storage = localStorage.setItem(
      "usersInformation",
      JSON.stringify(allUsersInformation)
    );

      
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
  }
}

// ====================
// Selecting Login Page Elements

function login() {
  const loginEmail = document.querySelector("#login-email");
  const loginPassword = document.querySelector("#login-password");
  const loginButton = document.querySelector(".login__button a");

  // Start Login Functions
  if (
    loginEmail.value.trim().length == 0 ||
    loginPassword.value.trim().length == 0
  ) {
    return false;
  }

  for (var i = 0; i < allUsersInformation.length; i++) {
    if (
      allUsersInformation[i].theEmail.toLowerCase() ==
        loginEmail.value.toLowerCase() &&
      allUsersInformation[i].thePassword.toLowerCase() ==
        loginPassword.value.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", allUsersInformation[i].theName);
      console.log(localStorage.getItem("sessionUsername"));
      loginButton.setAttribute("href", "../index.html");
      // loginButton.setAttribute("target", "_blank");
      console.log('log');
    }
  }
}

