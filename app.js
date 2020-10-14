// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// event listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


function addTodo(e){
    // prevent form from submitting
    event.preventDefault();

    // tTodo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
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

    // clear todo input value 
    todoInput.value = '';
};

function deleteCheck(e) {
    const itemclicked = e.target;
    // delete todo
    if(itemclicked.classList[0] === 'trash-btn') {
        const todoselected = itemclicked.parentElement;
        todoselected.classList.add('fall');
    }

    // check
    if(itemclicked.classList[0] === 'complete-btn'){
        const todoselected = itemclicked.parentElement;
        todoselected.classList.toggle('completed');
    }
    
}