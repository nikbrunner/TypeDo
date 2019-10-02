// import {Command} from "../../lib/classConstructors.js";

export const readTodoCollection = userId => {
  const readTodoCollection = new Request("/readTodoCollection", {
    method: "post",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      userId: userId
    })
  });
  fetch(readTodoCollection)
    .then(res => res.json(), err => console.log(err))
    .then(res => buildTodos(res));
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
    .then(
      res => {
        return res.json();
      },
      err => console.log(err)
    )
    .then(res => {
      //console.log(res);
      readTodoCollection("nibru");
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

export const scanListAndAddEventlistenerForScrolling = () => {
  document.addEventListener("DOMContentLoaded", () => {
    let scrollToPoints = [];
    let todoContainers = [...document.querySelectorAll(".todo__container")];
    todoContainers.forEach(container => {
      scrollToPoints.push(container.offsetTop);
    });
  });
  // window.scrollTo(0, list3.offsetTop);
};

export const buildTodos = input => {
  input = JSON.stringify(input);
  let todoCollection = JSON.parse(input);
  const lists = Object.keys(todoCollection);

  const output = document.querySelector("#output");

  output.innerHTML = "";

  for (const list of lists) {
    let listId = list.split(" ").join("_");

    let todo__container = createDOMElement({
      target: output,
      classes: [`todo__container`],
      attributes: {
        id: `todo__container--${listId}`
      }
    });

    createDOMElement({
      target: todo__container,
      content: `<h2>${list}</h2>`,
      classes: ["todo__container__header"],
      attributes: {
        id: `todo__container__header--${list}`
      }
    });

    todoCollection[list].forEach(todo => {
      createDOMElement({
        content: `
          <h3 class="todo__title">${todo.title}</h3>
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
};
