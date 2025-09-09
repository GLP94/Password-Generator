const passwordLength = document.getElementById("password-number");
const passwordGen = document.getElementById("gen-btn");
const passwordInput = document.getElementById("password-input");
const copyButton = document.getElementById("copy-btn");
const upperCaseCheck = document.getElementById("upper-case");
const lowerCaseCheck = document.getElementById("lower-case");
const numberCheck = document.getElementById("number");
const symbolCheck = document.getElementById("symbol");
const avoidSame = document.getElementById("avoider");
const avoidAmb = document.getElementById("ambiguous");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const strengthRating = document.getElementById("passrating");

passwordGen.addEventListener("click", passwordFunction);
passwordLength.addEventListener("input", passwordFunction);

upperCaseCheck.addEventListener("click", passwordFunction);
lowerCaseCheck.addEventListener("click", passwordFunction);
numberCheck.addEventListener("click", passwordFunction);
symbolCheck.addEventListener("click", passwordFunction);
avoidSame.addEventListener("click", passwordFunction);

const copyModal = document.getElementById("copied-modal");

let copyModalAppear;

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.innerText);

  copyModal.style.display = "flex";

  if (copyModalAppear) {
    return;
  }
  copyModalAppear = setTimeout(() => {
    copyModal.style.display = "none";
    copyModalAppear = null;
  }, 2000);
});

increase.addEventListener("click", () => {
  if (passwordLength.value >= 32) {
    return;
  }
  passwordLength.value++;
  passwordFunction();
  passwordStrength();
});

decrease.addEventListener("click", () => {
  if (passwordLength.value <= 0) {
    return;
  }
  passwordLength.value--;
  passwordFunction();
  passwordStrength();
});

let increaseInterval;

function startIncrease() {
  if (increaseInterval) {
    return;
  }
  increaseInterval = setInterval(() => {
    if (passwordLength.value < 32) {
      passwordLength.value++;
      passwordFunction();
      passwordStrength();
    }
  }, 100);
}

function stopIncrease() {
  clearInterval(increaseInterval);
  increaseInterval = null;
}

increase.addEventListener("touchstart", startIncrease);
increase.addEventListener("touchend", stopIncrease);
increase.addEventListener("mousedown", startIncrease);
increase.addEventListener("mouseup", stopIncrease);

let decreaseInterval

function startDecrease() {
  if (decreaseInterval) {
    return;
  }
  decreaseInterval = setInterval(() => {
    if (passwordLength.value > 0) {
      passwordLength.value--;
      passwordFunction();
      passwordStrength();
    }
  }, 100);
}

function stopDecrease() {
  clearInterval(decreaseInterval);
  decreaseInterval = null;
}

decrease.addEventListener("touchstart", startDecrease);
decrease.addEventListener("touchend", stopDecrease);
decrease.addEventListener("mousedown", startDecrease);
decrease.addEventListener("mouseup", stopDecrease);

function passwordGenerator(length, upperCase, lowerCase, numbers, symbols) {
  let charSet = "";

  const upp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const low = "abcdefghijklmnopqrstuvwxyz";
  const num = "0123456789";
  const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?";

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
    passwordInput.innerText = "Please select at least one \n character set.";
    return;
  }

  if (length <= 0) {
    passwordInput.innerText = "Please select a password's \n length.";
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

function passwordStrength() {
  let score = 0;

  if (+passwordLength.value <= 8) {
    score += 1;
  } else if (+passwordLength.value <= 18) {
    score += 2;
  } else if (+passwordLength.value <= 24) {
    score += 3;
  } else {
    score += 4;
  }

  if (/[A-Z]/.test(passwordInput.innerText)) {
    score += 1;
  }

  if (/[a-z]/.test(passwordInput.innerText)) {
    score += 1;
  }

  if (/[0-9]/.test(passwordInput.innerText)) {
    score += 1;
  }

  if (/[!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]/.test(passwordInput.innerText)) {
    score += 1;
  }

  if (score <= 4) {
    strengthRating.innerText = "BAD";
  } else if (score <= 6) {
    strengthRating.innerText = "GOOD!";
  } else if (score === 8) {
    strengthRating.innerText = "AMAZING!";
  }
}

upperCaseCheck.addEventListener("click", passwordStrength);
lowerCaseCheck.addEventListener("click", passwordStrength);
numberCheck.addEventListener("click", passwordStrength);
symbolCheck.addEventListener("click", passwordStrength);

passwordStrength();
passwordFunction();
