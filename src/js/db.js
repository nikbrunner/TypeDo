// DOM Elements
const UI_inputTodoList = document.querySelector("#UI_inputTodoList");
const UI_inputTodoTitle = document.querySelector("#UI_inputTodoTitle");
const UI_btnTodoSubmit = document.querySelector("#UI_btnTodoSubmit");
const UI_output = document.querySelector("#UI_output");

// Functions
// https://github.com/bluzi/jsonstore#javascript
// - clearOutput()

const clearOutput = () => {
  UI_output.innerHTML = "";
};

// - createTodo()
const createTodo = (list, title) => {
  let storeTodo = new Request("/storeTodo", {
    method: "post",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      todoList: list.value,
      todoTitle: title.value
    })
  });

  fetch(storeTodo)
    .then(response => response.json(), err => console.log(err))
    .then(response => console.log(response));
};

UI_btnTodoSubmit.onclick = e => {
  createTodo(UI_inputTodoList, UI_inputTodoTitle);
};

console.log(createTodo);