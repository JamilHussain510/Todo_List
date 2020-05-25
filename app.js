//selectors
const todoInput = document.querySelector('.todo-input');

const todoButton = document.querySelector('.todo-button');

const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');
//Event handlers
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos);
//Functions
function addTodo(event) {
  //Prevent form from Submitting
  event.preventDefault();
  //todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //add todo to localstorage

  saveLocalTodos(todoInput.value);
  //CHECK MARK BUTTON
  const completebutton = document.createElement('button');
  completebutton.innerHTML = '<li class="fas fa-check"></li>';
  completebutton.classList.add('complete-button');
  todoDiv.appendChild(completebutton);
  //TRASH BUTTON
  const trashbutton = document.createElement('button');
  trashbutton.innerHTML = '<li class="fas fa-trash"></li>';
  trashbutton.classList.add('delete-button');
  todoDiv.appendChild(trashbutton);

  //APPAND TODO LIST

  todoList.appendChild(todoDiv);

  //CLEAR TODO INPUT VALUE
  todoInput.value = '';
}
function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === 'delete-button') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  //Check toDo
  if (item.classList[0] == 'complete-button') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Hey--- Do I already having things in there?
  let todos;
  if (localStorage.getItem('todos') == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completebutton = document.createElement('button');
    completebutton.innerHTML = '<li class="fas fa-check"></li>';
    completebutton.classList.add('complete-button');
    todoDiv.appendChild(completebutton);
    //TRASH BUTTON
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<li class="fas fa-trash"></li>';
    trashbutton.classList.add('delete-button');
    todoDiv.appendChild(trashbutton);

    //APPAND TODO LIST

    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
