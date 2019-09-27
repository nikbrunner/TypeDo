// DOM Elements
const UI_inputTodoList = document.querySelector('#UI_inputTodoList');
const UI_inputTodoTitle = document.querySelector('#UI_inputTodoTitle');
const UI_inputTodoNote = document.querySelector('#UI_inputTodoNote');
const UI_btnTodoSubmit = document.querySelector('#UI_btnTodoSubmit');
const UI_output = document.querySelector('#UI_output');

const clearOutput = () => {
    UI_output.innerHTML = '';
};

// - createTodo()
const createTodo = (list, title, note) => {
    let storeTodo = new Request('/storeTodo', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            todoList: list.value,
            todoTitle: title.value,
            todoNote: note.value,
        }),
    });

    fetch(storeTodo)
        .then(response => response.json(), err => console.log(err))
        .then(response => {
            console.log(response);
            // console.log(response.general[0].title);
            response = JSON.stringify(response);
            // UI_output.innerHTML = response.general[0].title;
            UI_output.innerHTML = response;
        });
};

UI_btnTodoSubmit.onclick = e => {
    createTodo(UI_inputTodoList, UI_inputTodoTitle, UI_inputTodoNote);
};
