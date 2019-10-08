export const readTodoCollection = userId => {
  const readTodoCollection = new Request('/readTodoCollection', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
    }),
  });

  // fetch(readTodoCollection)
  //     .then(res => res.json(), err => console.log(err))
  //     .then(res => renderTodos(res));

  // https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait
  const request = async address => {
    try {
      const response = await fetch(address);
      const json = await response.json();
      renderTodos(json);
      // let containerPositions = clientFunctions.scanTodosContainersAndReturnPositions();
    } catch (e) {
      console.log('There was an error when reading the Todo Collection');
      console.log(e);
    }
  };

  request(readTodoCollection);
};

export const renderTodos = todoCollection => {
  const lists = Object.keys(todoCollection);
  const output = document.querySelector('#output');
  output.innerHTML = '';

  for (const list of lists) {
    let listHtmlId = list.split(' ').join('_');

    let todos__container = createDOMElement({
      target: output,
      classes: [`todos__container`],
      attributes: {
        id: `todos__container--${listHtmlId}`,
      },
    });

    createDOMElement({
      target: todos__container,
      content: `<h2>${list}</h2>`,
      classes: ['todos__container__header'],
      attributes: {
        id: `todos__container__header--${list}`,
      },
    });

    todoCollection[list].forEach((todo, index) => {
      createDOMElement({
        content: `
        <h3 class="todo__title">${todo.title}</h3>
        <p class="todo__note ${todo.note === undefined ? 'empty' : ''}">
        ${todo.note === undefined ? '' : todo.note}</p>
        <div class="todo__meta">
          <p class="todo__clientId"><span>${index}</span></p>
          <p class="todo__dateCreated">${todo.dateCreated}</p>
        </div>
        `,
        target: todos__container,
        classes: ['todo'],
      });
    });
  }
};

export const processCommand = (input, userId) => {
  let commandPrompt = new Request('/processCommand', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      command: input.value,
      userId: userId,
    }),
  });

  // fetch(commandPrompt)
  //   .then(res => res.json(), err => console.log(err));
  // readTodoCollection(userId);

  // https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait
  const request = async address => {
    try {
      const response = await fetch(address);
      const json = await response.json();
      // console.log(json);
    } catch (e) {
      console.log('there was an error');
      console.log(e);
    }
  };

  request(commandPrompt);
  readTodoCollection(userId);
};

export const emptyAndFocusTarget = target => {
  target.value = '';
  target.focus();
};

export const createDOMElement = ({
  content = '',
  type = 'div',
  classes = false,
  attributes = false,
  target = document.body,
} = {}) => {
  let newDOMElement = document.createElement(type);
  if (content) newDOMElement.innerHTML = content;
  if (classes) newDOMElement.className = classes.join(' ');
  if (attributes) {
    for (let i in attributes) newDOMElement[i] = attributes[i];
  }
  target.appendChild(newDOMElement);
  return newDOMElement;
};

export const scanTodosContainersAndReturnPositions = () => {
  const header = document.querySelector('.header');
  let containerPositions = [];
  let todoContainers = [...document.querySelectorAll('.todos__container')];
  todoContainers.forEach(container => {
    let containerPosition = container.offsetTop - header.clientHeight;
    containerPositions.push(containerPosition);
  });
  return containerPositions;
};
