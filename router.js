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

  const keywords = {
    addTodo: '-td',
    remove: '-rm',
    selectAllKeyword: '*',
    selectSelfKeyword: 'self',
  };

  switch (true) {
    //  ! Remove ALL lists from collection file
    case command.list === keywords.selectAllKeyword &&
      command.cmd === keywords.remove &&
      command.title === keywords.selectSelfKeyword:
      serverFunctions
        .writeTodoCollectionFile(userId, {})
        .catch(err => console.log(err));
      break;

    // ! Remove ONE list from collection file
    case command.list !== undefined &&
      command.cmd === keywords.remove &&
      command.title === keywords.selectSelfKeyword:
      serverFunctions.removeListFromTarget(
        todoCollection_buffer,
        command.list
      );

      serverFunctions
        .writeTodoCollectionFile(userId, todoCollection_buffer)
        .then(() => res.send({ msg: 'ok, data written' }))
        .catch(err => console.log(err));
      break;

    // ! Remove ALL todos from a list
    case command.list !== undefined &&
      command.cmd === keywords.remove &&
      command.title === keywords.selectAllKeyword:
      serverFunctions.removeAllTodosFromTarget(
        todoCollection_buffer,
        command.list
      );

      serverFunctions
        .writeTodoCollectionFile(userId, todoCollection_buffer)
        .then(() => res.send({ msg: 'ok, data written' }))
        .catch(err => console.log(err));
      break;

    // ! Remove ONE todo from a list
    case command.list !== undefined &&
      command.cmd === keywords.remove &&
      command.title !== undefined:
      serverFunctions.removeTodoFromTarget(
        todoCollection_buffer,
        command.list,
        command.title
      );

      serverFunctions
        .writeTodoCollectionFile(userId, todoCollection_buffer)
        .then(() => res.send({ msg: 'ok, data written' }))
        .catch(err => console.log(err));
      break;

    // ! Create ONE todo in a list
    case command.list !== undefined &&
      command.cmd === keywords.addTodo &&
      command.title !== undefined:
      const todo = new Todo(
        command,
        serverFunctions.calculateClientIdFromTarget(
          todoCollection_buffer,
          command.list
        )
      );
      serverFunctions
        .readTodoCollectionFile(userId)
        .then(data => {
          todoCollection_buffer = JSON.parse(data);
        })
        .catch(err => console.log(err));

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

    default:
      console.log('No valid input');
      break;
  }
});

module.exports = router;
