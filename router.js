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
    // ! Create a new 'Todo' & write to 'todoCollection_user' file
    case command.list !== undefined &&
      command.cmd === '-td' &&
      command.title !== undefined:
      const todo = new Todo(
        command,
        serverFunctions.calculateClientIdFromTarget(
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

    // ! Remove entry from collection file
    case command.list !== undefined &&
      command.cmd === '-rm' &&
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
    // ! Remove list from collection file
    case command.list !== undefined &&
      command.cmd === '-rm' &&
      command.title === undefined:
      // let confirmation = prompt(
      //   `Do you really want to delete this list? \n${command.list} \n'Please type Y or N'`
      // );
      // if (confirmation.toLowerCase() === 'y') {
      //   serverFunctions.removeListFromTarget(
      //     todoCollection_buffer,
      //     command.list
      //   );

      //   serverFunctions
      //     .writeTodoCollectionFile(userId, todoCollection_buffer)
      //     .then(() => res.send({ msg: 'ok, data written' }))
      //     .catch(err => console.log(err));
      //   } else if (confirmation.toLowerCase() === 'n') {
      //     // do nothing
      //   }

      serverFunctions.removeListFromTarget(
        todoCollection_buffer,
        command.list
      );

      serverFunctions
        .writeTodoCollectionFile(userId, todoCollection_buffer)
        .then(() => res.send({ msg: 'ok, data written' }))
        .catch(err => console.log(err));
      break;

    //  ! Empty the whole collection file
    case command.list === undefined &&
      command.cmd === '-xx' &&
      command.title === undefined:
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
