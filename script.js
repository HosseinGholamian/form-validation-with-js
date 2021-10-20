const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const messageBox = formControl.querySelector('small');
    messageBox.textContent = message;
}


//show success 
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}
//get name field
function getNameField(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}
//validates
function validateEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
        showSuccess(input);

    } else {
        showError(input, `${ getNameField(input)} in not valid`);
    }
}



//check required

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${ getNameField(input)} is requeird`);
        } else {
            showSuccess(input);
        }
    });
}

//check length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${ getNameField(input)} must be at least ${min} chars`);
    } else if (input.value.length > max) {
        showError(input, `${ getNameField(input)} must be less than ${max} chars`);
    } else {
        showSuccess(input);
    }
}
//check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input1, `Passwords do not match`);
        showError(input2, `Passwords do not match`);
    }
}


//event listener
form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkRequired([username, password, email, password2]);
    validateEmail(email);
    checkLength(username, 3, 25);
    checkLength(password, 6, 25);
    checkLength(password2, 6, 25);
    checkPasswordMatch(password, password2);
})