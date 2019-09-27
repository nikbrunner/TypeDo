const dbcom = {
  createTodo: function(db, todoList, todoId, todoTitle) {
    fetch(db, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: {
        todoList: todoList,
        todoId: todoId,
        todoTitle: todoTitle,
        todoDone: false
      }
    });
  },
  readTodo: function(db, todoList, todoId) {},
  updateTitle: function(db, todoList, todoId, newTodoTitle) {},
  completeTodo: function(db, todoList, todoId) {},
  deleteTodo: function(db, todoList, todoId) {},
  readList: function(db, todoList) {},
  readAll: function(db) {}
};

module.exports = dbcom;

// const todos = {
//   general: [
//     {id: 234, title: 'Pups', done: false},
//     {id: 234, title: 'Pups', done: false},
//     {id: 234, title: 'Pups', done: false},
//   ]

// }
