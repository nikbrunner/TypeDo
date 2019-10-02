// import {Command} from "../../lib/classConstructors.js";

export const readTodoCollection = userId => {
  let todoCollection;

  const readTodoCollection = new Request("/readTodoCollection", {
    method: "post",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      userId: userId
    })
  });
  fetch(readTodoCollection)
    .then(res => res.json(), err => console.log(err))
    .then(res => {
      console.log(res);
      res = JSON.stringify(res);
      todoCollection = JSON.parse(res);
      const lists = Object.keys(todoCollection);

      /*
       * For Each list create a list__container--[listName]
       * For each todo(Object) in the list create a todo__container
       * For each todo__container create elements for the value of the todo(Object)
       */

      for (const list of lists) {
        let todo__container = createDOMElement({
          target: document.body,
          classes: [`todo__container`],
          attributes: {
            id: `todo__container--${list}`
          }
        });

        todoCollection[list].forEach(todo => {
          createDOMElement({
            content: `
              <h2 class="todo__title">${todo.title}</h2>
              <p class="todo__dateCreated">${todo.dateCreated}</p>
              <p class="todo__note">${todo.note}</p>
              <div class="todo__completed btnComplete"> 
                <label>
                  <input type="checkbox" ${todo.completed ? "checked" : ""}>
                  <span>${todo.completed ? "Done!" : "Open"}</span>
                </label>
              </div>
            `,
            target: todo__container,
            classes: ["todo"]
          });
        });
      }
    });
};

export const createTask = input => {
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
      res = JSON.stringify(res);
      // todo I need to implement a target here
      // UI_output.innerHTML = res;
      todoCollection = JSON.parse(res);
      const lists = Object.keys(todoCollection);
    });
};

export const emptyAndFocusTarget = target => {
  if (target) target.value = "";
  target.focus();
};

export const createDOMElement = ({
  content = "",
  type = "div",
  classes = false,
  attributes = false,
  target = document.body
} = {}) => {
  let newDOMElement = document.createElement(type);
  if (content) newDOMElement.innerHTML = content;
  if (classes) newDOMElement.className = classes.join(" ");
  if (attributes) {
    for (let i in attributes) newDOMElement[i] = attributes[i];
  }
  target.appendChild(newDOMElement);
  return newDOMElement;
};
