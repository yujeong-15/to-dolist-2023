const loginDelBtn = document.querySelector(".login-delete");
const passwordDelBtn = document.querySelector(".password-delete");
const loginInputValue = document.querySelector("#login");
const passwordInputValue = document.querySelector("#password");
const form = document.querySelector("#login-from");


const userId = loginInputValue.value;
const password = passwordInputValue.value;

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

async function onSubmit(event) {
    event.preventDefault();
    const loginUrl = 'https://evolvetasks-evolvetasks.koyeb.app/users/singin';
    if (loginInputValue.value === "" || passwordInputValue.value === "") {
        return;
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({userId, password})
      };
      
  try {
    const response = await fetch(loginUrl, requestOptions);
    const data = await response.json();

    const token = data.token;
    console.log("성공?");
    return token;

  } catch (error) {
    console.error('Login failed:', error);
    //return null; //null를 사용하면 명시적으로 값이 없음을 나타내기 위해서
  }
}