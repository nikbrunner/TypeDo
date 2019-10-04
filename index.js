// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// ! === IMPORT NPM
// const router = require("./routes/routes.js");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const moment = require("moment");

// ! === IMPORT OWN FILES
const {Command, Todo} = require("./lib/classConstructors.js");
const serverFunctions = require("./lib/serverFunctions.js");

// ! === EXPRESS SERVER
const express = require("express");
const server = express();
const PORT = 5000;
server.use(express.static("public"));
server.use(bodyParser.json());

// ! === BUFFER
let todoCollection_buffer;

// ! === ROUTES
server.post("/readTodoCollection", (req, res) => {
  const userId = req.body.userId;
  serverFunctions
    .readTodoCollectionFile(userId)
    .then(data => {
      todoCollection_buffer = JSON.parse(data);
      res.send(todoCollection_buffer);
    })
    .catch(err => console.log(err));
});

server.post("/processCommand", (req, res) => {
  const command = new Command(req.body.command);
  const userId = req.body.userId;
  console.log(command.list);

  switch (command.cmd) {
    case "-td":
      /*
       * Create a new 'Todo',
       * write to 'todoCollection_user' File,
       * read again
       * and send back to client
       */
      const todo = new Todo(
        command,
        serverFunctions.calculateClientIdBasedOnListLength(
          todoCollection_buffer,
          command.list
        )
      );

      serverFunctions.checkForExistingListsAndPushTodoToTarget(
        todoCollection_buffer,
        command.list,
        todo
      );

      serverFunctions
        .writeTodoCollectionFile(userId, todoCollection_buffer)
        .then(() => serverFunctions.readTodoCollectionFile(userId))
        .then(data => {
          todoCollection_buffer = JSON.parse(data);
          res.send(todoCollection_buffer);
        })
        .catch(err => console.log(err));
      break;
    case "-xx":
      /*
       * Empty the collection file,
       * read again
       * and send back to client
       */
      serverFunctions
        .writeTodoCollectionFile(userId, {})
        .then(() => serverFunctions.readTodoCollectionFile(userId))
        .then(data => {
          todoCollection_buffer = JSON.parse(data);
          res.send(todoCollection_buffer);
        })
        .catch(err => console.log(err));
      break;
    default:
      res.send({title: "No valid input!"});
      break;
  }
});

// ! === SERVER LISTEN
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
