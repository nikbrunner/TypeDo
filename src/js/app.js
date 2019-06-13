// todo [ ] add local storage
// todo [ ] destroy / complete todo
// todo [ ] add keywords
// todo [ ] design

init();

// ! Input KeyUp Listener
// input.addEventListener('keyup', () => {
//   if (input.value === 'show') {
//     // ! Clear input after keyword is triggered
//     showOpenTodos();
//     input.value = '';
//   }
// });

// ! Submit Listener
inputForm.addEventListener('submit', e => {
  const item = input.value;

  const cmdIndexStart = item.indexOf('-');
  const cmdIndexEnd = cmdIndexStart + 3;
  const cmd = item.substring(cmdIndexStart, cmdIndexEnd);

  const itemList = item.substring(0, cmdIndexStart - 1).toLowerCase();
  const itemTitle = item
    .substring(cmdIndexEnd + 1, item.length)
    .toLowerCase();

  createItem(itemList, cmd, itemTitle, e);

  e.preventDefault();
});
