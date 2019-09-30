// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// Import
const chalk = require("chalk");
const bodyParser = require("body-parser");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const moment = require("moment");

// Variables
const todos = {};
const db = "db/";

// Setup Static 'Express' Server
const express = require("express");
const server = express();
const PORT = 5000;
server.use(express.static("public"));
server.use(bodyParser.json());

server.post("/createTask", (req, res) => {
  // ? Async Await Function here ?
  // ? async saveTodo().then(res.send)
  // https://javascript.info/async-await

  let clientId = "";
  const serverId = uuidv4();

  class Command {
    constructor(input) {
      this.input = input;
    }
    get cmdIndexStart() {
      return this.input.indexOf("-");
    }
    get cmdIndexEnd() {
      return this.cmdIndexStart + 3;
    }
    get noteIndexStart() {
      return this.input.indexOf("'");
    }
    get noteIndexEnd() {
      return this.input.lastIndexOf("'");
    }
    get list() {
      return this.input.substring(0, this.cmdIndexStart - 1);
    }
    get cmd() {
      return this.input
        .substring(this.cmdIndexStart, this.cmdIndexEnd)
        .toLowerCase();
    }
    get title() {
      if (this.note == "No notes for that task!") {
        return this.input.substring(this.cmdIndexEnd + 1, this.input.length);
      } else {
        return this.input.substring(
          this.cmdIndexEnd + 1,
          this.noteIndexStart - 1
        );
      }
    }
    get note() {
      let note = this.input.substring(
        this.noteIndexStart + 1,
        this.noteIndexEnd
      );
      if (note == "") {
        return "No notes for that task!";
      } else {
        return note;
      }
    }
    get test() {
      console.log(this.input);
      console.log(this.list);
      console.log(this.cmd);
      console.log(this.title);
      console.log(this.note);
    }
  }

  const command = new Command(req.body.command);

  if (todos.hasOwnProperty(command.list)) {
    listLength = todos[command.list].length;
    clientId = listLength + 1;
  } else clientId = 1;

  class Todo {
    constructor(command) {
      this.clientId = clientId;
      this.serverId = serverId;
      this.list = command.list;
      this.title = command.title;
      this.note = command.note;
      this.dateCreated = moment().format("L");
      this.dateSince = moment()
        .startOf(this.dateCreated)
        .fromNow();
      this.dateCompleted = "";
      this.done = false;
    }
  }

  const todo = new Todo(command);

  if (todos.hasOwnProperty(command.list)) todos[command.list].push(todo);
  else {
    todos[command.list] = [];
    todos[command.list].push(todo);
  }

  res.send(todos);
  /* Create a JSON File on the server for each todoList
   * if a file with the [todoList].json name exits append
   * - load json
   * - convert to object
   * - append to object
   * - convert to json
   * - write to file
   * - if not create file
   */
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
