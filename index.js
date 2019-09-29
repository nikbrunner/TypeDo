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
server.post('/storeTodo', (req, res) => {
    let clientId = '';
    const serverId = uuidv4();
    const list = req.body.list;
    const title = req.body.title;
    const note = req.body.note;

    if (todos.hasOwnProperty(list)) {
        listLength = todos[list].length;
        clientId = listLength + 1;
    } else clientId = 1;

    class Todo {
        constructor(title, note) {
            this.clientId = clientId;
            this.serverId = serverId;
            this.title = title;
            this.note = note;
            this.dateCreated = moment().format('L');
            this.dateSince = moment()
                .startOf(this.dateCreated)
                .fromNow();
            this.dateCompleted = '';
            this.done = false;
        }
    }

    const todo = new Todo(title, note);

    if (todos.hasOwnProperty(list)) todos[list].push(todo);
    else {
        todos[list] = [];
        todos[list].push(todo);
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
