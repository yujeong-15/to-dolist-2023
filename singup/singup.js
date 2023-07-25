const userId = document.getElementById("userId");
const passsword = document.getElementById("password");
const userName = document.getElementById("userName");
const isValid = document.querySelector(".userIdBox .isValid");
console.log(isValid);


userId.addEventListener('change', onChangeInput);
//todo:전 유효성 체크 잡는 방법, input실시간 감지 이벤트 찾아보기
function onChangeInput(){
    isValid.style.visibility = 'visible';
    if(isRequiredFieldChecked()){

    }
    isRequiredFieldChecked();
    spaceCheck();
    isValidId();
}

function spaceCheck() {
    const spaceRegex = /^\s+|\s+$|\s+(?=\s)/g;
    console.log(userId.value);
    if (spaceRegex.test(userId.value)) {
        console.log("Ddd");
        isValid.innerText = "공백이 들어가 있습니다.";

        return true;
    }
}

function isValidId() {
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!regex.test(userId.value)) {
         isValid.innerText = "6~20글자 이내의 영문자와 숫자로 이루어진 아이디를 입력해주세요";
        return true;
    }
    
}
function isRequiredFieldChecked() {
    const pattern = /^.+$/;
    if (!pattern.test(userId.value)) {
         isValid.innerText = "필수 항목입니다";
         return true;
    }
    return false;
}

