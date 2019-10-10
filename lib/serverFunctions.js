const fs = require('fs');
const dbPathFinder = require('./dbPathFinder.js');
const chalk = require('chalk');
const moment = require('moment');

module.exports.writeTodoCollectionFile = (userId, content) => {
  return new Promise((resolve, reject) => {
    path = dbPathFinder.userFilePathConstructor(userId);
    content = JSON.stringify(content);
    fs.writeFile(path, content, err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
};

module.exports.readTodoCollectionFile = userId => {
  path = dbPathFinder.userFilePathConstructor(userId);
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        data = data.toString();
        resolve(data);
      }
    });
  });
};

module.exports.calculateClientIdFromTarget = (target, list) => {
  console.log('target: ' + target);
  console.log('list: ' + list);
  if (target.hasOwnProperty(list) == undefined) {
    return 0;
  } else if (target.hasOwnProperty(list)) {
    let listLength = target[list].length;
    return listLength;
  } else {
    return 0;
  }
};

module.exports.checkForExistingListsAndPushTodoToTarget = (
  target,
  list,
  todo
) => {
  list = list.toLowerCase();
  if (target.hasOwnProperty(list)) {
    target[list].push(todo);
  } else {
    target[list] = [];
    target[list].push(todo);
  }
};

module.exports.removeTodoFromTarget = (target, list, todoId) => {
  target[list].splice(todoId, 1);
};

module.exports.removeAllTodosFromTarget = (target, list) => {
  target[list] = [];
};

module.exports.removeListFromTarget = (target, list) => {
  delete target[list];
};

module.exports.notifyServerIsRunning = (port, err) => {
  console.log(
    err ||
      chalk.whiteBright('::: ') +
        chalk.greenBright.bold(`Server running on `) +
        chalk.cyanBright.bold(`Port ${port} `) +
        chalk.magentaBright.bold(`since ${moment().format('LT')} `) +
        chalk.whiteBright(' :::')
  );
  console.log(
    chalk.whiteBright('::: ') +
      chalk.yellowBright.bold(
        '         Use this port as client!         '
      ) +
      chalk.whiteBright(' :::')
  );
};
