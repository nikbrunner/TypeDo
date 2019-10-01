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
    // https://stackoverflow.com/questions/31264153/assign-value-from-successful-promise-resolve-to-external-variable
    const command = new Command(req.body.command);

    let todoCollection = readTodoCollectionFile('nibru')
        .then(data => {
            data = JSON.parse(data);
            return data;
        })
        .catch(err => err);

    console.log(todoCollection);
    console.log(typeof todoCollection);

    const todo = new Todo(
        command,
        calculateClientIdBasedOnListLength(todoCollection, command.list),
        uuidv4()
    );

    checkForExistingListsAndPushTodoToTarget(
        todoCollection,
        command.list,
        todo
    );
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
