init();

// ! Submit Listener | todo
inputForm.addEventListener('submit', e => {
  const command = input.value;
  // ! Declare  command as an object with methods ?!
  // getCommandParam(command);
  const cmdIndexStart = command.indexOf('-');
  const cmdIndexEnd = cmdIndexStart + 3;
  const cmd = command.substring(cmdIndexStart, cmdIndexEnd);
  // ! I really want to refactor here but i dont know how
  // - Methods ?
  // - Functions ?
  if (cmd === commands.todo) {
    const itemList = `db.${command
      .substring(0, cmdIndexStart - 1)
      .toLowerCase()}`;
    const itemTitle = command
      .substring(cmdIndexEnd + 1, command.length)
      .toLowerCase();
    createItem(itemList, cmd, itemTitle, e);
  } else if (command === commands.console.clearAllDone) {
    refreshAll();
    clearInput();
  } else if (command === commands.console.clearAllOutputs) {
    clearAllOutputs();
  }

  e.preventDefault();
});
