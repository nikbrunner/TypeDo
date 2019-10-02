// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// ! ImportPackages
// const router = require("./routes/routes.js");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const moment = require("moment");

// ! Import own files
const {Command, Todo} = require("./lib/classConstructors.js");
const {
  calculateClientIdBasedOnListLength,
  checkForExistingListsAndPushTodoToTarget,
  writeTodoCollectionFile,
  readTodoCollectionFile
} = require("./lib/serverFunctions.js");

// ! Setup Static 'Express' Server
const express = require("express");
const server = express();
const PORT = 5000;
server.use(express.static("public"));
server.use(bodyParser.json());

// ! Variables
let todoCollection;

// ! Read collection File on load
const init = () => {
  fs.readFile("./db/collection_nibru.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    if (data == undefined) {
      writeTodoCollectionFile("nibru", "{}");
    } else {
      todoCollection = JSON.parse(data);
    }
  });
};

init();

// ! Routes
server.post("/readTodoCollection", (req, res) => {
  const userId = req.body.userId;
  res.send(todoCollection);
});

server.post("/createTask", (req, res) => {
  // https://stackoverflow.com/questions/31264153/assign-value-from-successful-promise-resolve-to-external-variable
  const command = new Command(req.body.command);

  const todo = new Todo(
    command,
    calculateClientIdBasedOnListLength(todoCollection, command.list),
    uuidv4()
  );

  checkForExistingListsAndPushTodoToTarget(todoCollection, command.list, todo);

  writeTodoCollectionFile("nibru", todoCollection)
    .then(() => readTodoCollectionFile("nibru"))
    .then(data => {
      // console.log(data);
      todoCollection = JSON.parse(data);
      res.send(data);
    })

    .catch(err => console.log(err));
});

// Setup Server Listen
server.listen(PORT, err => {
  console.log(
    err ||
      chalk.whiteBright("::: ") +
        chalk.greenBright.bold(`Server running on `) +
        chalk.cyanBright.bold(`Port ${PORT} `) +
        chalk.magentaBright.bold(`since ${moment().format("LT")} `) +
        chalk.whiteBright(" :::")
  );
  console.log(
    chalk.whiteBright("::: ") +
      chalk.yellowBright.bold("         Use this port as client!         ") +
      chalk.whiteBright(" :::")
  );
});
