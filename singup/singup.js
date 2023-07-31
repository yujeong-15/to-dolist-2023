//아이디 변수 선언
const userId = document.getElementById("userId");
const errorId = document.querySelector(".error-id");

//비밀번호 변수 선언
const password = document.getElementById("password");
const errorPassword = document.querySelector(".error-password");
const eyes = document.querySelector(".fa-eye-slash");

//이메일 변수 선언
const email = document.getElementById("email");
const errorEmail = document.querySelector(".error-email");

//이름 변수 선언
const userName = document.getElementById("userName");
const errorUserName = document.querySelector(".error-userName");


//생년월일 변수 선언
const date = document.getElementById("date");
const errorDate = document.querySelector(".error-date");

const form = document.querySelector("#singup-from");
form.addEventListener("submit", onSubmit);


//전체 input
const input = document.getElementsByClassName("text");
const inputArray = [...input];

//아이디 기능
userId.addEventListener("blur", () => {
    if (userId.value === "") {
        userId.classList.add("error-input");
        errorId.innerHTML = "필수 정보입니다."
        errorId.style.visibility = "visible";
    }
});

function handleIdChange() {
    const pattern = /^(?![0-9])[a-zA-Z](?!.*[^a-zA-Z0-9]).{3,19}$/;
    errorId.style.visibility = "visible";
    if (userId.value === "") {
        errorId.innerHTML = "필수 정보입니다.";
        userId.classList.add("error-input");
    } else if (!pattern.test(userId.value)) {
        errorId.innerHTML = "4~20자의 영대소문자, 숫자만 사용 가능합니다. 다만, 숫자로 시작할 수 없습니다.";
        userId.classList.add("error-input");
    } else {
        userId.classList.remove("error-input");
        errorId.style.visibility = "hidden";
        errorId.innerHTML = "";
    }
}


//패스워드 기능
password.addEventListener("blur", () => {
    if (password.value === "") {
        password.classList.add("error-input");
        errorPassword.innerHTML = "필수 정보입니다."
        errorPassword.style.visibility = "visible";
    }
});

function handlePasswordChange() {
    const pattern = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/;
    errorPassword.style.visibility = "visible";
    if (password.value === "") {
        errorPassword.innerHTML = "필수 정보입니다.";
        password.classList.add("error-input");

    } else if (!pattern.test(password.value)) {
        errorPassword.innerHTML = "8~16자의 영대소문자, 숫자, 특수문자 중  2종류 문자조합으로 해주세요";
        password.classList.add("error-input");

    } else {
        password.classList.remove("error-input");
        errorPassword.style.visibility = "hidden";
        errorPassword.innerHTML = "";
    }
}

eyes.addEventListener("click", () => {
    eyes.classList.toggle("fa-eye");
    eyes.classList.toggle("fa-eye-slash");
    if (eyes.classList.contains("fa-eye-slash")) {
        password.setAttribute("type", "password");
    } else {
        password.setAttribute("type", "text");
    }
});


//이메일 기능
function handleEmailChange() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        errorEmail.style.visibility = "visible";
        email.classList.add("error-input");
        errorEmail.innerHTML = "이메일 주소가 정확한지 확인해 주세요.";
    } else {
        email.classList.remove("error-input");
        errorPassword.style.visibility = "hidden";
        errorEmail.innerHTML = "";
    }
}


//이름 기능
userName.addEventListener("blur", () => {
    if (userName.value === "") {
        userName.classList.add("error-input");
        errorUserName.innerHTML = "필수 정보입니다."
        errorUserName.style.visibility = "visible";
    }
});


function handleNameChange() {
    const pattern = /^[가-힣a-zA-Z]+$/;

    if (userName.value === "") {
        errorUserName.innerHTML = "필수 정보입니다.";
        userName.classList.add("error-input");
        errorUserName.style.visibility = "visible";
    } else if (!pattern.test(userName.value)) {
        errorUserName.innerHTML = "한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)";
        userName.classList.add("error-input");
        errorUserName.style.visibility = "visible";
    } else {
        userName.classList.remove("error-input");
        errorUserName.style.visibility = "hidden";
        errorUserName.innerHTML = "";
    }
}


//생년월일 기능
date.addEventListener("blur", () => {
    if (date.value === "") {
        date.classList.add("error-input");
        errorDate.innerHTML = "필수 정보입니다."
        errorDate.style.visibility = "visible";
    }
});

function handleDateChange() {
    const pattern = /^[0-9]*$/;
    if (date.value === "") {
        date.classList.add("error-input");
        errorDate.innerHTML = "필수 정보입니다."
        errorDate.style.visibility = "visible";
    } else if (!pattern.test(date.value) && 1 < date.value.length && date.value.length < 8) {
        console.log("xxx");
    }
}

function handleDateChange() {
    const numberPattern = /^\d{8}$/;
    const pattern = /^(191[4-9]|19[2-9]\d|200\d|201[0-9]|202[0-3])(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;


    if (date.value === "") {
        date.classList.add("error-input");
        errorDate.innerHTML = "필수 정보입니다.";
        errorDate.style.visibility = "visible";
    } else if (!numberPattern.test(date.value)) {
        date.classList.add("error-input");
        errorDate.style.visibility = "visible";
        errorDate.innerHTML = "생년월일은 8자리 숫자로 입력해 주세요.";
    } else {
        if (!pattern.test(date.value)) {
            date.classList.add("error-input");
            errorDate.style.visibility = "visible";
            errorDate.innerHTML = "생년월일이 정확한지 확인해 주세요.";
        } else {
            date.value = date.value.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
            date.classList.remove("error-input");
            errorDate.style.visibility = "hidden";
            errorDate.innerHTML = "";
        }
        date.value = date.value.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
    }
}

function onSubmit(event) {
    let hasError = false;
  
    inputArray.forEach((text) => {
      if (text.classList.contains("error-input")) {
        hasError = true;
      } else if (text.value === "" && text.type !== "email") {
        text.classList.add("error-input");
        const errorTextElement = text.nextElementSibling; //형제요소 찾기
        errorTextElement.innerHTML = "필수 정보입니다.";
        errorTextElement.style.visibility = "visible";
        hasError = true;
      }
    });
  
    if (hasError) {
      event.preventDefault();
    }
  }