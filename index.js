// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// Import
// const router = require("./routes/routes.js");
const chalk = require('chalk');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const { Command, Todo } = require('./lib/classConstructors.js');
const {
    calculateClientIdBasedOnListLength,
    checkForExistingListsAndPushTodoToTarget,
    writeTodoCollectionFile,
    readTodoCollectionFile,
} = require('./lib/serverFunctions.js');

// Variables
const todos = {};

// Setup Static 'Express' Server
const express = require('express');
const server = express();
const PORT = 5000;
server.use(express.static('public'));
server.use(bodyParser.json());

server.post('/readTodoCollection', (req, res) => {
    const userId = req.body.userId;

    readTodoCollectionFile(userId)
        .then(data => {
            data = JSON.parse(data);
            res.send(data);
        })
        .catch(err => err);
});

server.post('/createTask', (req, res) => {
    const command = new Command(req.body.command);

    const todo = new Todo(
        command,
        calculateClientIdBasedOnListLength(todos, command.list),
        uuidv4()
    );

    let todoCollection = {};

    readTodoCollectionFile('nibru')
        .then(data => {
            data = JSON.parse(data);
            // console.log(typeof data);
            todoCollection = data;
            console.log(todoCollection);
        })
        .catch(err => err);

    checkForExistingListsAndPushTodoToTarget(
        todoCollection,
        command.list,
        todo
    );

    console.log(todoCollection);
    console.log(command.list);
    console.log(todo);

    // checkForExistingListsAndPushTodoToTarget(todos, command.list, todo);

    /* Create a JSON File on the server for each todoList
     * if a file with the [todoList].json name exits append
     * - load and parse json to object
     * - append new todo to object
     * - stringify object to json
     * - write to file
     * - if not create file
     */

    writeTodoCollectionFile('nibru', todoCollection)
        .then(() => readTodoCollectionFile('nibru'))
        .then(data => res.send(data))
        .catch(err => console.log(err));
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
