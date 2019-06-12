// ! init
function init() {
  refreshAll();
}

// ! Clear Input

function clearInput() {
  input.value = '';
}

// ! Create Todo
function createTodo(e) {
  // if (input.value === 'general -a')
  todosGeneral.push({ title: input.value, done: false });
  refreshAll();
  clearInput();
  e.preventDefault();
}

// ! Read all _OPEN_ Todos and put them in the output container
function showOpenTodos(list, output) {
  let openTodos = [];
  let checkmark;
  // ! filter open todos
  list.forEach(todo => {
    if (todo.done === false) {
      checkmark = ' ';
      openTodos.push(todo);
    }
  });
  let outputString = '';
  openTodos.forEach(todo => {
    outputString += `<li>[${checkmark}] ${todo.title}</li>`;
  });
  output.innerHTML = outputString;
}

function refreshAll() {
  showOpenTodos(todosGeneral, outputGeneral);
  showOpenTodos(todosWork, outputWork);
  showOpenTodos(todosC1, outputC1);
  showOpenTodos(todosC2, outputC2);
  showOpenTodos(todosC3, outputC3);
  showOpenTodos(todosC4, outputC4);
}

// ! Destroy Todo
