// Get UI variables
const input = document.getElementById('input');
const inputForm = document.getElementById('inputForm');
const outputGeneral = document.getElementById('output_general');
const outputWork = document.getElementById('output_work');
const outputC1 = document.getElementById('output_c1');
const outputC2 = document.getElementById('output_c2');
const outputC3 = document.getElementById('output_c3');
const outputC4 = document.getElementById('output_c4');
const checkmarks = document.getElementsByClassName('checkmark');

// ! Command Palette
const commands = {
  todo: '-td',
  note: '-nt',
  completeTodo: '-rm',
  clearList: '-cl',
  console: {
    clearAllDone: 'console -clearAllDone',
    clearAllOutputs: 'console -clearAllOutputs',
    darkMode: 'console -dm',
    lightMode: 'console -lm',
  },
};
