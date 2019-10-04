// Imports
const fs = require("fs");
const dbPathFinder = require("./dbPathFinder.js");

module.exports.calculateClientIdBasedOnListLength = (target, list) => {
  if (target.hasOwnProperty(list)) {
    let listLength = target[list].length;
    return listLength + 1;
  } else {
    return 1;
  }
};

module.exports.checkForExistingListsAndPushTodoToTarget = (target, list, todo) => {
  list = list.toLowerCase();
  if (target.hasOwnProperty(list)) {
    target[list].push(todo);
  } else {
    target[list] = [];
    target[list].push(todo);
  }
};

module.exports.writeTodoCollectionFile = (userId, content) => {
  return new Promise((resolve, reject) => {
    path = dbPathFinder.userFilePathConstructor(userId);
    content = JSON.stringify(content);
    fs.writeFile(path, content, err => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports.readTodoCollectionFile = userId => {
  path = dbPathFinder.userFilePathConstructor(userId);
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
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
