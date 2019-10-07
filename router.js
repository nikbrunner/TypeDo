const { Command, Todo } = require('./lib/classConstructors.js');
const serverFunctions = require('./lib/serverFunctions.js');

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());

let todoCollection_buffer;

router.post('/readTodoCollection', (req, res) => {
  const userId = req.body.userId;
  serverFunctions
    .readTodoCollectionFile(userId)
    .then(data => {
      todoCollection_buffer = JSON.parse(data);
      res.send(todoCollection_buffer);
    })
    .catch(err => console.log(err));
});

router.post('/processCommand', (req, res) => {
  const command = new Command(req.body.command);
  const userId = req.body.userId;

  switch (true) {
    case command.list !== undefined &&
      command.cmd === '-td' &&
      command.title !== undefined:
      // Create a new 'Todo' & write to 'todoCollection_user' File
      command.printCommand();

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
        .then(() => res.send({ msg: 'ok, data written' }))
        .catch(err => console.log(err));
      break;
    case command.list === undefined &&
      command.cmd === '-xx' &&
      command.title === undefined:
      //  Empty the whole collection file

      command.printCommand();

      serverFunctions
        .writeTodoCollectionFile(userId, {})
        .catch(err => console.log(err));
      break;
    default:
      console.log('No valid input');
      break;
  }
});

module.exports = router;
