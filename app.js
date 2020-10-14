// all selectors that i need
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);


function addTodo(e){
    // prevent form from submitting
    event.preventDefault();

    // tTodo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // check if the input is empty
    if(!todoInput.value == '') {
        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Add todo to localstorage
        saveLocalTodos(todoInput.value);

        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    }

    // clear todo input value 
    todoInput.value = '';
};

function deleteCheck(e) {
    const itemclicked = e.target;
    // delete todo
    if(itemclicked.classList[0] === 'trash-btn') {
        const todoselected = itemclicked.parentElement;
        todoselected.classList.add('fall');
        removeLocalTodos(todoselected);
        todoselected.addEventListener('transitionend', function(){
            todoselected.remove();
        });
    }

    // check
    if(itemclicked.classList[0] === 'complete-btn'){
        const todoselected = itemclicked.parentElement;
        todoselected.classList.toggle('completed');
    }
    
}

function filterToDo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
};

function verifyLocalStorage() {
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveLocalTodos(todo) {
    // do i have already things in there?
    let todos = verifyLocalStorage();
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // do i have already things in there?
    let todos = verifyLocalStorage();

    todos.forEach(function(todo) {
        // tTodo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        // check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    // do i have already things in there?
    let todos = verifyLocalStorage();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}