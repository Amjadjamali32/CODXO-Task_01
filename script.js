document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.querySelector('#input-Text');
    const addButton = document.querySelector('#addTodoBtn');
    const todoList = document.querySelector('.todo-list');
    const emptyListAlert = document.querySelector('.emptyListAlert');
    const emptyInputAlert = document.querySelector('.empty-Input-Alert');

     // Check if the list is empty and update the alert
        const checkIfListIsEmpty = () => {
        if (todoList.children.length == 0) {
            emptyListAlert.textContent = "List is empty!";
        } else {
            emptyListAlert.textContent = "";
        }
    };

    // getting todos for the local storage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todoText => {
            addTodoToDOM(todoText);
        });
        checkIfListIsEmpty();
    };

    // save todos to the local storage
    const saveTodos = () => {
        const todos = Array.from(todoList.children).map(item => item.firstChild.textContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // add todos to the DOM 
    const addTodoToDOM = (todoText) => { 
        const todoItem = document.createElement("li");
        todoItem.textContent = todoText;

        let editbtn = document.createElement("button");
        let deletebtn = document.createElement("button");

        editbtn.style.backgroundColor = "aliceblue"
        editbtn.style.border = "none"
        editbtn.style.float = "right"
        
        deletebtn.style.backgroundColor = "aliceblue"
        deletebtn.style.border = "none"
        deletebtn.style.float = "right"
        
        editbtn.innerHTML = '<i class="fas fa-edit" style="color: green"></i>';
        deletebtn.innerHTML = '<i class="fas fa-trash" style="color: red"></i>';
        
        // edit button to edit todos
        editbtn.addEventListener("click", () => {
            const newTodoText = prompt("Edit your todo:", todoItem.textContent);
            if (newTodoText !== null && newTodoText.trim() !== "") {
                todoItem.firstChild.textContent = newTodoText;
                saveTodos();  checkIfListIsEmpty();
            }
        });
        
        // Remove a todo from the list
        deletebtn.addEventListener("click", () => {
            todoList.removeChild(todoItem);         
            saveTodos();
            checkIfListIsEmpty();``
        });
        
        todoItem.appendChild(editbtn);
        todoItem.appendChild(deletebtn);
        todoList.appendChild(todoItem);
        checkIfListIsEmpty();
    };

    // adding todos
    addButton.addEventListener("click", () => {
        const todoText = inputText.value.trim();
        
        if (!todoText) {
            emptyInputAlert.textContent = "Please write something to add!"
            // console.log("Input is empty!");
            return;
        }
        emptyInputAlert.textContent = ""

        addTodoToDOM(todoText);
        saveTodos();
        inputText.value = ""; // Clear the input after adding the todo
    });

    loadTodos();
});