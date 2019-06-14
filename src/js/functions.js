// ! init
function init() {
  clearInput();
  refreshAll();
  window.onload = () => {
    focusInput();
  };
}

// ! Clear input
function clearInput() {
  input.value = '';
}

function focusInput() {
  input.focus();
}

// ! Refresh all lists
function refreshAll() {
  refreshList(db.general, outputGeneral);
  refreshList(db.work, outputWork);
  refreshList(db.c1, outputC1);
  refreshList(db.c2, outputC2);
  refreshList(db.c3, outputC3);
  refreshList(db.c4, outputC4);
  focusInput();
}

function clearAllOutputs() {
  outputGeneral.innerHTML = '';
  outputWork.innerHTML = '';
  outputC1.innerHTML = '';
  outputC2.innerHTML = '';
  outputC3.innerHTML = '';
  outputC4.innerHTML = '';
  focusInput();
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
function refreshList(list, output) {
  // ? why do not need to convert 'list' here ?
  let openTodos = [];
  let checkmark;
  // ! filter open todos
  list.forEach(todo => {
    if (todo.done === false) {
      checkmark = '&bull;';
      openTodos.push(todo);
    }
  });
  let outputString = '';
  openTodos.forEach(todo => {
    outputString += `<li class="outputListItem"><span class="checkmark">${checkmark}</span> ${
      todo.title
    }</li>`;
  });
  output.innerHTML = outputString;
}

// ! Complete Todo
// A this point i want to leave the completed todos..
// .. and want to give possibility to clear all done todos
document.body.addEventListener('click', e => {
  if (
    e.target.classList.contains('outputListItem') &&
    e.target.classList.contains('completed')
  ) {
    e.target.firstChild.innerHTML = '&bull;';
    e.target.classList.remove('completed');
    // todo flag list item as 'done: false'
  } else if (e.target.classList.contains('outputListItem')) {
    let targetList = `db.${e.target.parentElement.previousElementSibling.innerText.toLowerCase()}`;
    targetList = eval(targetList);
    let targetItemTitle = e.target.innerText.substring(
      2,
      e.target.innerText.length
    );
    searchAndCompleteItem(targetItemTitle, targetList);
    e.target.firstChild.innerHTML = '&cross;';
    e.target.classList.add('completed');

    // setTimeout(() => {
    //   e.target.parentElement.remove();
    // }, 3000);
  }
});

// ! Search for a value
function searchAndCompleteItem(searchTitle, array) {
  // console.log(array);
  array.forEach(item => {
    if (item.title === searchTitle) {
      item.done = true;
    }
  });
}
