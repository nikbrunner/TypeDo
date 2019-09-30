// DOM Elements
const UI_inputCommand = document.querySelector("#UI_inputCommand");
const UI_btnTodoSubmit = document.querySelector("#UI_btnTodoSubmit");
const UI_output = document.querySelector("#UI_output");

const clearOutput = () => {
  UI_output.innerHTML = "";
};

const createTask = input => {
  let createTask = new Request("/createTask", {
    method: "post",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      command: input.value
    })
  });

  fetch(createTask)
    .then(res => res.json(), err => console.log(err))
    .then(res => {
      console.log(res);
      res = JSON.stringify(res);
      UI_output.innerHTML = res;
    });
};

UI_inputCommand.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    createTask(UI_inputCommand);
  }
});

UI_btnTodoSubmit.onclick = e => {
  createTask(UI_inputCommand);
};
