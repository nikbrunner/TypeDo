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
    let storeTodo = new Request('/saveTodo', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            list: list.value,
            title: title.value,
            note: note.value,
        }),
    });

    fetch(storeTodo)
        .then(res => res.json(), err => console.log(err))
        .then(res => {
            console.log(res);
            // console.log(res.general[0].title);
            res = JSON.stringify(res);
            // UI_output.innerHTML = res.general[0].title;
            UI_output.innerHTML = res;
        });
};

UI_btnTodoSubmit.onclick = e => {
    createTodo(UI_inputTodoList, UI_inputTodoTitle, UI_inputTodoNote);
};
