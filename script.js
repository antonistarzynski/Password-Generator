/// display charachter length

const slider = document.querySelector(".slider");
const lengthAmount = document.querySelector(".length-amount");

lengthAmount.textContent = slider.value;
slider.addEventListener("input", (e) => {
    lengthAmount.textContent = e.target.value;
})


/// main logic with generating password


const submitBtn = document.querySelector(".generate");
const passOutput = document.querySelector(".password-output");

const passLevelClass = document.querySelector(".rate-boxes");
const passLevelText = document.querySelector(".strength-rate-text");

const upperCase = document.querySelector("#uppercase-letters");
const lowerCase = document.querySelector("#lowercase-letters");
const numbersCase = document.querySelector("#numbers");
const symbolsCase = document.querySelector("#symbols");

const copyBtn = document.querySelector(".copy-icon");
const copiedText = document.querySelector(".copied");


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    passOutput.textContent = "";
    copiedText.classList.add("none");
    passOutput.classList.remove("gray");

    const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    let result = "";

    for (let i = 0; i < slider.value; i++) {
        const base = {};

        if (lowerCase.checked === true) {
            base[Object.keys(base).length] = lowerLetters[Math.floor(Math.random() * 25)];
        }
        if (upperCase.checked === true) {
            base[Object.keys(base).length] = upperLetters[Math.floor(Math.random() * 25)];
        }
        if (numbersCase.checked === true) {
            base[Object.keys(base).length] = numbers[Math.floor(Math.random() * 9)];
        }
        if (symbolsCase.checked === true) {
            base[Object.keys(base).length] = symbols[Math.floor(Math.random() * 28)];
        }

        strengthPoints = slider.value * Object.keys(base).length;

        let random = Math.floor(Math.random() * Object.keys(base).length);
        if (Object.keys(base).length === 0) {
            result = "No input:("
        } else {
            result += base[random];
        }
    }

    /// strength of the password

    passLevelClass.classList.remove("too-weak");
    passLevelClass.classList.remove("weak");
    passLevelClass.classList.remove("medium");
    passLevelClass.classList.remove("strong");

    if (strengthPoints < 15) {
        passLevelText.textContent = "too weak";
        passLevelClass.classList.add("too-weak");

    } else if (strengthPoints < 26) {
        passLevelText.textContent = "weak";
        passLevelClass.classList.add("weak");

    } else if (strengthPoints < 37) {
        passLevelText.textContent = "medium";
        passLevelClass.classList.add("medium");

    } else if (strengthPoints >= 37) {
        passLevelText.textContent = "strong";
        passLevelClass.classList.add("strong");
    };

    passOutput.textContent = result;
})

/// copying generated password to clipboard

copyBtn.addEventListener("click", () => {
    let text = passOutput.textContent;

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(text);
            copiedText.classList.remove("none");
        }
        catch (err) {
            console.log(err);
        }
    }

    copyContent();
})


