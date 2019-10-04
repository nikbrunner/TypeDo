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

export const buildTodos = todoCollection => {
  const lists = Object.keys(todoCollection);

  const output = document.querySelector("#output");

  output.innerHTML = "";

  for (const list of lists) {
    let listHtmlId = list.split(" ").join("_");

    let todos__container = createDOMElement({
      target: output,
      classes: [`todos__container`],
      attributes: {
        id: `todos__container--${listHtmlId}`
      }
    });

    createDOMElement({
      target: todos__container,
      content: `<h2>${list}</h2>`,
      classes: ["todos__container__header"],
      attributes: {
        id: `todos__container__header--${list}`
      }
    });

    todoCollection[list].forEach(todo => {
      createDOMElement({
        content: `
          <h3 class="todo__title">${todo.title}</h3>
          <p class="todo__note"></span>${todo.note}</p>
          <div class="todo__btnToComplete"> 
            <label>
              <input type="checkbox" ${todo.completed ? "checked" : ""}>
              <span>${todo.completed ? "Finally!" : "Dew it!"}</span>
            </label>
          </div>
          <p class="todo__meta">
            <span class="todo__clientId">ID ${todo.clientId}</span> -
            <span class="todo__dateCreated">${todo.dateCreated}</span>
          </p>
        `,
        target: todos__container,
        classes: ["todo"]
      });
    });
  }
};

export const processCommand = (input, userId) => {
  let commandPrompt = new Request("/processCommand", {
    method: "post",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      command: input.value,
      userId: userId
    })
  });

  fetch(commandPrompt).then(res => res.json(), err => console.log(err));

  readTodoCollection("nibru");
};

export const emptyAndFocusTarget = target => {
  target.value = "";
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

export const scanListsAndAddEventlistenerToScrollWithArrowKeys = () => {
  // todo This is not functional yet and just a first concept
  let scrollToPoints = [];
  document.addEventListener("DOMContentLoaded", () => {
    let todoContainers = [...document.querySelectorAll(".todos__container")];
    todoContainers.forEach(container => {
      scrollToPoints.push(container.offsetTop);
    });
  });
  return scrollToPoints;
};
