const todoInput = document.getElementById('todo-input');
const ul = document.getElementById('todo-ul');
const addBtn = document.getElementById('add');
const tooltipSpan = document.querySelector('.tooltip');
const todoper = document.querySelector('.todo-per');
let newTodoObj = [];

addBtn.addEventListener('click', addTodoList);
todoInput.addEventListener('keydown', handleInputText);

function addTodoList() {
  if (todoInput.value === '') {
    todoInput.placeholder = 'Please input!';
    return;
  } else {
    createTodo();
    todoInput.value = '';
    save();
    displayProgress();
  }
}

function handleInputText(event) {
  if (event.key === 'Enter') {
    if (todoInput.value === '' || todoInput.value === undefined) {
      todoInput.placeholder = 'Please input!';
      return;
    } else {
      addTodoList();
    }
  }
}

function save() {
  localStorage.setItem('newTodoList', JSON.stringify(newTodoObj));
}

//to-dolist 틀 만들기
function paintTodo(newTodo) {

  const li = document.createElement('li');
  const input = document.createElement('input');

  const modifybtn = document.createElement('button');
  const deletebtn = document.createElement('button');
  const completeBtn = document.createElement('button');

  modifybtn.innerHTML = '✏️Edit';
  deletebtn.innerHTML = '❌Del';


  input.setAttribute('type', 'text');
  input.setAttribute('readonly', 'true');


  li.classList.add('todo-li');
  input.classList.add('todo-list');
  modifybtn.classList.add('todo-btn', 'modifybtn');
  deletebtn.classList.add('todo-btn', 'deletbtn');
  completeBtn.classList.add('todo-btn', 'completeBtn', 'searchBtn');

  li.append(completeBtn, input, modifybtn, deletebtn);
  ul.append(li);

  input.value = newTodo.text;
  li.id = newTodo.id;
  displayProgress();
  deletebtn.addEventListener('click', deleteTodo);
  modifybtn.addEventListener('click', function () {
    clickModify(newTodo);
  });
  completeBtn.addEventListener('click', function () {
    completeTodo(newTodo);
  });

}

//완료된 to-do-list 처리
function completeTodo(completeTodo) {
  const li = document.getElementById(completeTodo.id);
  const checkBox = li.querySelector('.completeBtn');
  const checkedInpt = li.querySelector('.todo-list');

  checkedInpt.classList.add('checked');
  checkBox.classList.remove('completeBtn');
  checkBox.classList.add('checkBtn');
  checkBox.innerHTML = '✅';
  completeTodo.checked = true;
  save();
  displayProgress();
}

//todo-list수정
function clickModify(modifyTodo) {
  const li = document.getElementById(modifyTodo.id);
  const modifyInput = li.querySelector('.todo-list');
  const liId = newTodoObj.findIndex((todo) => todo.id === parseInt(li.id));

  if (newTodoObj[liId].checked === true) {
    modifyInput.readOnly = true;
  } else {
    modifyInput.readOnly = false;
  }

  modifyInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      if (liId !== -1) {
        newTodoObj[liId].text = modifyInput.value;
        modifyInput.readOnly = true;
      }
      save();
      displayProgress();
    }
  });
}

//todo 정보 만들기
function createTodo() {
  const text = todoInput.value;
  const todo = { 'id': Date.now(), text, 'checked': false };
  newTodoObj.push(todo);
  paintTodo(todo);
  displayProgress();
}

//todo-list 삭제
function deleteTodo(event) {
  const liDelete = event.target.parentElement;
  newTodoObj = newTodoObj.filter((x) => x.id.toString() !== liDelete.id);
  ul.removeChild(liDelete);
  save();
  displayProgress();
}

const saveTodo = localStorage.getItem('newTodoList');
if (saveTodo) {
  const parsedTodos = JSON.parse(saveTodo);
  newTodoObj = parsedTodos;
  parsedTodos.forEach(paintTodo);
  const checked = newTodoObj.filter((todo) => todo.checked === true);

  newTodoObj.forEach((x) => {
    checked.forEach((check) => {
      if (x.id === check.id) {
        const checkedLi = document.getElementById(x.id);
        const completeInput = checkedLi.querySelector('.todo-list');
        const checkBox = checkedLi.querySelector('.searchBtn');
        checkBox.classList.add('checkBtn');
        checkBox.classList.remove('completeBtn');
        completeInput.classList.add('checked');
        checkBox.innerHTML = '✅';

      }
    })
  })
}

//진행률 표시
function displayProgress() {
  const getSaveTodo = localStorage.getItem('newTodoList');
  const parsedTodos = JSON.parse(getSaveTodo);
  const completeItem = parsedTodos && parsedTodos.filter((todo) => todo.checked === true).length;
  const todoItems = parsedTodos.length;
  const progressPercentage = Math.round((completeItem / todoItems) * 100);

  tooltipSpan.innerHTML = `${progressPercentage}%`;
  todoper.style.width = `${progressPercentage}%`;
  if (progressPercentage === 100) {
    $("#startButton").trigger("click");
    setTimeout(function () {
      $("#stopButton").trigger("click");
    },3000);
  }
}


