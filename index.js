//클래스
class Todo {
  constructor(id, text, check) {
    this.id = id;
    this.text = text;
    this.check = check;
  }


}
class PaintTodo {
  constructor() {
    this.li = document.createElement('li');
    this.input = document.createElement('input');
    this.modifyBtn = document.createElement('button');
    this.deleteBtn = document.createElement('button');
    this.completeBtn = document.createElement('button');
    this.addClassList();
  }
  //각 요소에 속성 추가
  addClassList() {
    this.li.classList.add('todo-li');
    this.input.classList.add('todo-list');
    this.modifyBtn.classList.add('todo-btn', 'modify-btn');
    this.deleteBtn.classList.add('todo-btn', 'delete-btn');
    this.completeBtn.classList.add('todo-btn', 'complete-btn');
  }
  //만들기
  paintTodo(newTodo) {
    this.modifyBtn.innerHTML = '✏️Edit';
    this.deleteBtn.innerHTML = '❌Del';

    this.input.setAttribute('type', 'text');
    this.input.setAttribute('readonly', 'false');

    this.li.append(this.completeBtn, this.input, this.modifyBtn, this.deleteBtn);
    ul.append(this.li);

    this.input.value = newTodo.text;
    this.li.id = newTodo.id;

    this.deleteBtn.addEventListener('click', () => this.deleteTodo());
    this.modifyBtn.addEventListener('click', () => this.clickModify());
    this.completeBtn.addEventListener('click', () => this.toggleCheckbox(newTodo));

    displayProgress();
  }

  //todo-list 삭제
  deleteTodo() {
    newTodoObj = newTodoObj.filter((x) => x.id.toString() !== this.li.id);
    ul.removeChild(this.li);
    save();
    displayProgress();
  }

  //todo-list수정
  clickModify() {
    const liId = newTodoObj.findIndex((todo) => todo.id === parseInt(this.li.id));
    if (newTodoObj[liId].check) {
      this.input.readOnly = true;
    } else {
      this.input.readOnly = false;
      this.input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.commitEditedContent(liId);
        }
      });
      this.input.addEventListener('blur', () => this.commitEditedContent(liId));
    }
  }

  commitEditedContent(liId) {
    newTodoObj[liId].text = this.input.value;
    this.input.readOnly = true;
    save();
    displayProgress();
  }

  toggleCheckbox(todo) {
    if (!todo.check) {
      this.input.readOnly = true;
      this.completeBtn.innerHTML = '✅';
      this.input.classList.toggle('checked', true);
      this.completeBtn.classList.toggle('complete-btn', false);
      this.completeBtn.classList.toggle('check-btn', true);
      todo.check = true;

    }
    else {
      this.completeBtn.innerHTML = '';
      this.input.classList.toggle('checked', false);
      this.completeBtn.classList.toggle('complete-btn', true);
      this.completeBtn.classList.toggle('check-btn', false);
      todo.check = false;
    }
    save();
    displayProgress();
  }
}

function createTodo() {
  const text = todoInput.value;
  const todo = new Todo(Date.now(), text, false);
  newTodoObj.push(todo);

  paintTodo.paintTodo(todo);
  displayProgress();
}

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
    todoInput.value === '' || todoInput.value === undefined ? todoInput.placeholder = 'Please input!' : addTodoList();
  }
}

function save() {
  localStorage.setItem('newTodoList', JSON.stringify(newTodoObj));
}

//진행률 표시
function displayProgress() {
  const completeItem = newTodoObj && newTodoObj.filter((todo) => todo.check === true).length;
  const todoItems = newTodoObj.length;
  let progressPercentage = 0;

  if (todoItems > 0) {
    progressPercentage = Math.round((completeItem / todoItems) * 100);
  }
  tooltipSpan.innerHTML = `${progressPercentage}%`;
  todoper.style.width = `${progressPercentage}%`;
}



const todoInput = document.getElementById('todo-input');
const ul = document.getElementById('todo-ul');
const addBtn = document.getElementById('add');
const tooltipSpan = document.querySelector('.tooltip');
const todoper = document.querySelector('.todo-per');
const paintTodo = new PaintTodo();
let newTodoObj = [];


const saveTodo = localStorage.getItem('newTodoList');

if (saveTodo) {
  newTodoObj = JSON.parse(saveTodo);
  const checked = newTodoObj.filter((todo) => todo.check);

  newTodoObj.forEach(todo => {
    const paintTodo = new PaintTodo();
    paintTodo.paintTodo(todo);
    //다 돌리고 
    if (todo.check) {
      checked.forEach((checkedTodo) => {
        if (checkedTodo.id === todo.id) {
          paintTodo.completeBtn.classList.add('check-btn');
          paintTodo.completeBtn.classList.remove('complete-btn');
          paintTodo.input.classList.add('checked');
          paintTodo.completeBtn.innerHTML = '✅';
        }

      })
    }
  });
  displayProgress();
};

addBtn.addEventListener('click', addTodoList);
todoInput.addEventListener('keydown', handleInputText);




