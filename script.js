const passwordLength = document.getElementById("password-number");
const passwordGeneratorButton = document.getElementById("password-button");
const passwordInput = document.getElementById("password-input");
const copyButton = document.getElementById("copy-btn");
const upperCaseCheck = document.getElementById("upper-case");
const lowerCaseCheck = document.getElementById("lower-case");
const numberCheck = document.getElementById("number");
const symbolCheck = document.getElementById("symbol");
const avoidSame = document.getElementById("avoider");

const upp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const low = "abcdefghijklmnopqrstuvwxyz";
const num = "0123456789";
const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?";

passwordGeneratorButton.addEventListener("click", passwordFunction);
passwordLength.addEventListener("input", passwordFunction);

upperCaseCheck.addEventListener("click", passwordFunction);
lowerCaseCheck.addEventListener("click", passwordFunction);
numberCheck.addEventListener("click", passwordFunction);
symbolCheck.addEventListener("click", passwordFunction);
avoidSame.addEventListener("click", passwordFunction);

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.innerText);
  copyButton.innerText = "Copied!";
  setTimeout(function () {
    copyButton.innerText = "Copy";
  }, 2000);
});

function passwordGenerator(length, upperCase, lowerCase, numbers, symbols) {
  let charSet = "";

  if (upperCase) {
    charSet += upp;
  }

  if (lowerCase) {
    charSet += low;
  }

  if (numbers) {
    charSet += num;
  }

  if (symbols) {
    charSet += sym;
  }

  let password = "";

  let charArr = charSet.split("");

  for (let i = 0; i < length; i++) {
    if (avoidSame.checked) {
      let randomIndex = Math.floor(Math.random() * charArr.length);
      let randomChar = charArr[randomIndex];
      password += randomChar;
      charArr.splice(randomIndex, 1);
      if (charArr.length === 0) {
        break;
      }
    } else {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
  }

  return password;
}

function passwordFunction() {
  let length = passwordLength.value;
  let upperCase = upperCaseCheck.checked;
  let lowerCase = lowerCaseCheck.checked;
  let numbers = numberCheck.checked;
  let symbols = symbolCheck.checked;

  if (!upperCase && !lowerCase && !numbers && !symbols) {
    passwordInput.innerText = "Please select at least one character set.";
    return;
  }

  if (length <= 0) {
    passwordInput.innerText = "Please select a password's length.";
    return;
  }

  let password = passwordGenerator(
    length,
    upperCase,
    lowerCase,
    numbers,
    symbols
  );

  passwordInput.innerText = password;
}

function passwordStrenght() {
  let score = 0;

  if (upperCaseCheck.checked) {
    score += 1;
  }

  if (lowerCaseCheck.checked) {
    score += 1;
  }

  if (numberCheck.checked) {
    score += 1;
  }

  if (symbolCheck.checked) {
    score += 1;
  }

  if (passwordLength.value < 8) {
    score += 1;
  } else if (passwordLength.value < 16) {
    score += 1;
  } else if (passwordLength.value < 32) {
    score += 1;
  } else if (passwordLength.value >= 32) {
    score += 1;
  }

  if (score <= 2) {
    return "Weak";
  } else if (score <= 4) {
    return "Mild";
  } else if (score <= 6) {
    return "Medium";
  } else if (score <= 8) {
    return "Strong!";
  }
}

passwordFunction();
