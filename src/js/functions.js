// ! init
function init() {
  refreshAll();
  console.log(db.general);
}

// ! Clear Input

function clearInput() {
  input.value = '';
}

// ! Create Todo
function createItem(list, cmd, title, e) {
  list = eval(list);
  list.push({ title: title, done: false });
  refreshAll();
  clearInput();
  e.preventDefault();
}

// ! Read all _OPEN_ Todos and put them in the output container
function showOpenTodos(list, output) {
  // ? why do not need to convert 'list' here ?
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
    outputString += `<li class="outputListItem"><span class="checkmark">[${checkmark}]</span> ${
      todo.title
    }</li>`;
  });
  output.innerHTML = outputString;
}

function refreshAll() {
  showOpenTodos(db.general, outputGeneral);
  showOpenTodos(db.work, outputWork);
  showOpenTodos(db.c1, outputC1);
  showOpenTodos(db.c2, outputC2);
  showOpenTodos(db.c3, outputC3);
  showOpenTodos(db.c4, outputC4);
}

// ! Complete Todo
// A this point i want to leave the completed todos..
// .. and want to give possibility to clear all done todos
document.body.addEventListener('click', e => {
  if (
    e.target.classList.contains('checkmark') &&
    e.target.innerHTML === '[ ]'
  ) {
    let targetList = `db.${e.target.parentElement.parentElement.previousElementSibling.innerText.toLowerCase()}`;
    targetList = eval(targetList);
    e.target.innerHTML = '[X]';
    // flag list item as 'done: true'
    console.log(targetList + ' ' + typeof targetList);
    targetList.done = true;
    e.target.parentElement.style.color = 'green';
    e.target.parentElement.style.fontWeight = 'bold';
    // setTimeout(() => {
    //   e.target.parentElement.remove();
    // }, 3000);
    console.log(db.general);
  } else if (
    e.target.classList.contains('checkmark') &&
    e.target.innerHTML === '[X]'
  ) {
    e.target.innerHTML = '[ ]';
    // flag list item as 'done: false'
    e.target.parentElement.style.color = 'black';
    e.target.parentElement.style.fontWeight = 'initial';
    console.log(db.general);
  }
});
