// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// Import
const chalk = require('chalk');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const { Command, Todo } = require('./lib/classConstructors.js');
const {
    calculateClientIdBasedOnListLength,
    checkForExistingListsAndPushTodoToTarget,
} = require('./lib/serverFunctions.js');

// Variables
const todos = {};
const db = 'db/';

// Setup Static 'Express' Server
const express = require('express');
const server = express();
const PORT = 5000;
server.use(express.static('public'));
server.use(bodyParser.json());

server.post('/createTask', (req, res) => {
    const command = new Command(req.body.command);

    const todo = new Todo(
        command,
        calculateClientIdBasedOnListLength(todos, command.list),
        uuidv4()
    );

    checkForExistingListsAndPushTodoToTarget(todos, command.list, todo);

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
