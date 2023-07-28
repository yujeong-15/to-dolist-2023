const loginDelBtn = document.querySelector(".login-delete");
const passwordDelBtn = document.querySelector(".password-delete");
const loginInputValue = document.querySelector("#login");
const passwordInputValue = document.querySelector("#password");
const form = document.querySelector("#login-from");


//todo:좀 더 효율적으로 생각해보기
loginDelBtn.addEventListener("click", clearLoginValue);
passwordDelBtn.addEventListener("click", clearPasswordValue);
form.addEventListener("submit", onSubmit);




function clearLoginValue() {
    loginInputValue.value = "";
}

function clearPasswordValue() {
    passwordInputValue.value = "";
}

function onSubmit(event) {
    if (loginInputValue.value === "" || passwordInputValue.value === "") {
        event.preventDefault();
    }
}