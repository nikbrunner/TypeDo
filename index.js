// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// Import
const chalk = require('chalk');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

// Variables
const todos = {};
const db = 'db/';

// Setup Static 'Express' Server
const express = require('express');
const server = express();
const PORT = 5000;
server.use(express.static('public'));
server.use(bodyParser.json());

// Path
server.post('/storeTodo', (request, response) => {
    const todoList = request.body.todoList;
    const todoTitle = request.body.todoTitle;

    class Todo {
        constructor(todoTitle) {
            (this.todoId = uuidv4()),
                (this.todoTitle = todoTitle),
                (this.done = false);
        }
    }
    const todo = new Todo(todoTitle);

    if (todos.hasOwnProperty(todoList)) todos[todoList].push(todo);
    else {
        todos[todoList] = [];
        todos[todoList].push(todo);
    }

    // Send 'todo' back as object to the client
    response.send(todos);

    /* Create a JSON File on the server for each todoList
     * if a file with the [todoList].json name exits append
     * - load json
     * - convert to object
     * - append to object
     * - convert to json
     * - write to file
     * - if not create file
     */

    // fs.writeFile(path, data, {flag: "wx"}, function(err) {
    //   if (err) console.log(err);
    //   else console.log("It's saved!");
    // });

    console.log(todos);
});

// Setup Server Listen
server.listen(PORT, err => {
    let time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
    });
    console.log(
        err ||
            chalk.whiteBright('::: ') +
                chalk.greenBright.bold(`Server running on `) +
                chalk.cyanBright.bold(`Port ${PORT} `) +
                chalk.magentaBright.bold(`since ${time} `) +
                chalk.whiteBright(' :::')
    );
    console.log(
        chalk.whiteBright('::: ') +
            chalk.yellowBright.bold('Use this port as client!') +
            chalk.whiteBright(' :::')
    );
});
