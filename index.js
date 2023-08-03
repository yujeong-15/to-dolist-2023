const loginDelBtn = document.querySelector(".login-delete");
const passwordDelBtn = document.querySelector(".password-delete");
const loginInputValue = document.querySelector("#login");
const passwordInputValue = document.querySelector("#password");
const form = document.querySelector("#login-from");



let userId = '';
let password = '';

//todo:좀 더 효율적으로 생각해보기
loginDelBtn.addEventListener("click", clearLoginValue);
passwordDelBtn.addEventListener("click", clearPasswordValue);
form.addEventListener("submit", onSubmit);



function createValue(){
    userId = loginInputValue.value;
    password = passwordInputValue.value;
}


function clearLoginValue() {
    loginInputValue.value = "";
}

function clearPasswordValue() {
    passwordInputValue.value = "";
}

async function onSubmit(event) {
  if (loginInputValue.value === "" || passwordInputValue.value === "") {
    return;
  }
  event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer your-access-token',
        },
        body: JSON.stringify({userId, password})
      };
      
      try {
        const response = await fetch('https://evolvetasks-evolvetasks.koyeb.app/users/singin', requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("성공", data);
        window.location.href = 'todo/todo.html';
      } catch (error) {
        console.error('Login failed:', error);
      }
}