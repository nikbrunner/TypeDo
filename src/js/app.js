// todo [ ] add local storage
// todo [ ] destroy / complete todo
// todo [ ] add keywords
// todo [ ] design
// ! Design
// - CSS Grid
// - Jede Grid Box ist eine Liste
// - Zuweisung durch create Element und Klassen zuweisung
// - Durch die Klasse kann man die position im grid zuweisen

init();

// ! Input KeyUp Listener
input.addEventListener('keyup', () => {
  if (input.value === 'show') {
    // ! Clear input after keyword is triggered
    showOpenTodos();
    input.value = '';
  }
});

// ! Submit Listener
inputForm.addEventListener('submit', createTodo);
