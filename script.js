const passwordLength = document.getElementById("password-number");
const passwordGen = document.getElementById("gen-btn");
const upperCaseCheck = document.getElementById("upper-case");
const lowerCaseCheck = document.getElementById("lower-case");
const numberCheck = document.getElementById("number");
const symbolCheck = document.getElementById("symbol");
const avoidSame = document.getElementById("avoider");
const avoidAmb = document.getElementById("ambiguous");
const onlyHex = document.getElementById("hexa");
const passGenerated = document.getElementById("passGenerated");

passwordGen.addEventListener("click", passwordFunction);

let numPass = document.getElementById("numPass");

numPass.textContent = passwordLength.value;

passwordLength.addEventListener("input", () => {
  numPass.textContent = passwordLength.value;
});

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

  if (avoidAmb.checked) {
    charSet = charSet.replace(/[I1l0O]/g, "");
  }

  if (onlyHex.checked) {
    charSet = charSet.replace(
      /[GHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*\(\)\_\+\-\=\[\]\{\}\|\;\:\,\.\<\>\?]/g,
      ""
    );
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

  passwordStorage(password);
  passContainer(password);
  
}

function passContainer(password) {
  let cont = document.createElement("div");
  cont.classList.add("pass");

  let para = document.createElement("p");
  para.innerText = password;

  let contB = document.createElement("div");
  contB.classList.add("passB");

  let del = document.createElement("button");
  del.classList.add("delete-btn");
  del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

  let copy = document.createElement("button");
  copy.classList.add("copy-btn");
  copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>`;

  cont.appendChild(para);
  cont.appendChild(contB);
  contB.appendChild(del);
  contB.appendChild(copy);
  passGenerated.appendChild(cont);
}

const copyModal = document.getElementById("copied-modal");

let copyModalAppear;

passGenerated.addEventListener("click", (e) => {
  const del = e.target.closest(".delete-btn");
  if (del) {
    const p = del.closest(".pass");
    if (p) {
      p.remove();
    }
  }

  const cop = e.target.closest(".copy-btn")
  if (cop) {
    const p = cop.closest(".pass");
    
    navigator.clipboard.writeText(p.innerText);

    copyModal.style.display = "flex";

    if (!copyModalAppear) {
      copyModalAppear = setTimeout(() => {
        copyModal.style.display = "none";
        copyModalAppear = null;
      }, 2000);
    }
  }
  
});

const conts = passGenerated.querySelectorAll(".pass");
for (let i = 0; i < conts.length; i++) {
  if (i % 2 === 0) {
    conts[i].style.backgroundColor = "red";
  }
}

function passwordStrength(str) {
  let score = 0;

  if (pass.innerText.length <= 8) {
    score += 1;
  } else if (pass.innerText.length <= 18) {
    score += 2;
  } else if (pass.innerText.length <= 24) {
    score += 3;
  } else {
    score += 4;
  }

  let charset = [];

  for (let char of pass.innerText) {
    if (!charset.includes(char)) {
      charset.push(char);
      score += 1;
    } else {
      continue;
    }
  }
}

function passwordStorage(p) {
  const passwordSaved = localStorage.getItem("password");
  const passwordList = passwordSaved ? JSON.parse(passwordSaved) : [];

  passwordList.push(p);

  localStorage.setItem("password", JSON.stringify(passwordList));
}

function loadPasswordStorage() {
  const passwordList = JSON.parse(passwordSaved);

  passwordList.forEach((p) => {});
}

loadPasswordStorage();
