const {Command, Todo} = require("./lib/classConstructors.js");
const serverFunctions = require("./lib/serverFunctions.js");

const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.use(bodyParser.json());

let todoCollection_buffer;

// define the home page route
// router.get("/", function(req, res) {
//   res.send("Birds home page");
// });

router.post("/readTodoCollection", (req, res) => {
  const userId = req.body.userId;
  serverFunctions
    .readTodoCollectionFile(userId)
    .then(data => {
      todoCollection_buffer = JSON.parse(data);
      res.send(todoCollection_buffer);
    })
    .catch(err => console.log(err));
});

router.post("/processCommand", (req, res) => {
  const command = new Command(req.body.command);
  const userId = req.body.userId;

  switch (command.cmd) {
    case "-td":
      /*
       * Create a new 'Todo',
       * write to 'todoCollection_user' File,
       * read again
       * and send back to client
       */
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
        .then(() => serverFunctions.readTodoCollectionFile(userId))
        .then(data => {
          todoCollection_buffer = JSON.parse(data);
          res.send(todoCollection_buffer);
        })
        .catch(err => console.log(err));
      break;
    case "-xx":
      /*
       * Empty the collection file,
       * read again
       * and send back to client
       */
      serverFunctions
        .writeTodoCollectionFile(userId, {})
        .then(() => serverFunctions.readTodoCollectionFile(userId))
        .then(data => {
          todoCollection_buffer = JSON.parse(data);
          res.send(todoCollection_buffer);
        })
        .catch(err => console.log(err));
      break;
    default:
      res.send({title: "No valid input!"});
      break;
  }
});

module.exports = router;
