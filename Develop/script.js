//We need to create the interface between the js and css/html files.
//We use the document.querySelector and the document.getElementById methods to achieve this.
//We make reference to the #generate element in the html file.
var criteriaBtn = document.querySelector("#select_criteria");
var generateBtn = document.querySelector("#generate");

//This block of code corresponds to the Select Criteria button and the dialog box that appears.
var criteriaDialog = document.getElementById('criteriaConfig');
var criteriaSubmitBtn = document.getElementById('criteriaSubmit');

//Establish the variables associated with the different criteria options for the user.
var cri_length;
var cri_lower;
var cri_upper;
var cri_number;
var cri_special;

//Establish the constants for each of the predefined variables.
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";


// Write password to the #password input
function openDialoge() {
    if (typeof criteriaDialog.showModal === "function") {
        criteriaDialog.showModal();
    } else {
        alert("The <dialog> API is not supported by this browser");
    }
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword(cri_length, cri_lower, cri_upper, cri_number, cri_special);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

function enableGeneratePassword(event) {
    const passLength = document.getElementById('length').value;
    const hasLowerCase = document.getElementById('lowercase').checked;
    const hasUpperCase = document.getElementById('uppercase').checked;
    const hasNumber = document.getElementById('numeric').checked;
    const hasSpecialChar = document.getElementById('special').checked;

    console.log(passLength);
    console.log(hasLowerCase);
    console.log(hasUpperCase);
    console.log(hasNumber);
    console.log(hasSpecialChar);

    var errorTextLabel = document.getElementById('errorText')

    var criteriaIsSet = false; //-> Here we are establishing the criteria as true or false.
    if (passLength >= 8 && passLength <= 128) {
        if (hasLowerCase || hasUpperCase || hasNumber || hasSpecialChar) {
            criteriaIsSet = true
        }
    }

    if (criteriaIsSet) {
        generateBtn.disabled = false; //-> If the full criteria is not met, the Generater Password btn is not activated.
        cri_length = passLength;
        cri_lower = hasLowerCase;
        cri_upper = hasUpperCase;
        cri_number = hasNumber;
        cri_special = hasSpecialChar;
        errorTextLabel.innerHTML = "";
    } else {
        generateBtn.disabled = true;
        errorTextLabel.innerHTML = "At lease one character type or length is not within range";
        event.preventDefault(); //-> The dialoge box does not close if all of the criteria are not met. This part of the code keeps the dialoge box open.
    }
}

function generatePassword(len, lower, upper, number, special) {
    var types = [];
    var passwordArray = [];

    if (lower) {
        types.push("lower");
    }
    if (upper) {
        types.push("upper");
    }
    if (number) {
        types.push("number");
    }
    if (special) {
        types.push("special");
    }

    var eachTypeLen = Math.floor(len / types.length);
    var extraLength = len - eachTypeLen * types.length;


    if (lower) {
        passwordArray.push(...returnRandomString(lowerChars, eachTypeLen));
    }
    if (upper) {
        passwordArray.push(...returnRandomString(upperChars, eachTypeLen));
    }
    if (number) {
        passwordArray.push(...returnRandomString(numbers, eachTypeLen));
    }
    if (special) {
        passwordArray.push(...returnRandomString(specialChars, eachTypeLen));
    }

    if (extraLength > 0) {
        switch (types[0]) {
            case "lower":
                passwordArray.push(...returnRandomString(lowerChars, extraLength));
                break;
            case "upper":
                passwordArray.push(...returnRandomString(upperChars, extraLength));
                break;
            case "number":
                passwordArray.push(...returnRandomString(numbers, extraLength));
                break;
            case "special":
                passwordArray.push(...returnRandomString(specialChars, extraLength));
                break;
            default:
        }
    }

    return shuffle(passwordArray);
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array.join("");
}

function returnRandomString(inString, len) {
    var outStrArray = [];
    for (let i = 0; i < len; i++) {
        const position = Math.floor(Math.random() * inString.length);
        outStrArray.push(inString.charAt(position));
    }

    return outStrArray;
}


// Add event listener to the Select Criteria and Generate Password button. 
criteriaBtn.addEventListener("click", openDialoge);
criteriaSubmitBtn.addEventListener("click", enableGeneratePassword);
generateBtn.addEventListener("click", writePassword);