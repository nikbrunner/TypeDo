// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// Import
const chalk = require('chalk');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

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
    const todoNote = request.body.todoNote;
    class Todo {
        constructor(todoTitle, todoNote) {
            this.id = uuidv4();
            this.title = todoTitle;
            this.note = todoNote;
            this.dateCreated = moment().format('L');
            this.dateSince = moment()
                .startOf(this.dateCreated)
                .fromNow();
            this.dateCompleted = '';
            this.done = false;
        }
    }

    const todo = new Todo(todoTitle, todoNote);

    if (todos.hasOwnProperty(todoList)) todos[todoList].push(todo);
    else {
        todos[todoList] = [];
        todos[todoList].push(todo);
    }

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
});

// Setup Server Listen
server.listen(PORT, err => {
    console.log(
        err ||
            chalk.whiteBright('::: ') +
                chalk.greenBright.bold(`Server running on `) +
                chalk.cyanBright.bold(`Port ${PORT} `) +
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
});
