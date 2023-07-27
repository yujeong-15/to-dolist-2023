const loginDelBtn = document.querySelector(".login-delete");
const passwordDelBtn = document.querySelector(".password-delete");
const loginInputValue = document.querySelector("#login");
const passwordInputValue = document.querySelector("#password");
console.log(passwordInputValue);


//todo:좀 더 효율적으로 생각해보기
loginDelBtn.addEventListener("click", clearLoginValue);
passwordDelBtn.addEventListener("click", clearPasswordValue);

loginDelBtn.setAttribute("")

function clearLoginValue() {
    loginInputValue.value = "";
}

function clearPasswordValue() {
    passwordInputValue.value = "";
}