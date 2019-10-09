// ! === IMPORTS
import * as clientFunctions from './clientFunctions.js';

// ! === DOM ELEMENTS
const UI_inputCommand = document.querySelector('#UI_inputCommand');
const user = 'nibru';

let position;
// let containerPositions;

// ! === INIT FUNCTION TO SET UP STARTUP
const init = () => {
  position = 0;
  window.scrollTo(0, position);
  clientFunctions.readTodoCollection(user);
  // clientFunctions.emptyAndFocusTarget(UI_inputCommand);
};

init();

// ! === EVENT LISTENERS
/* This first Event Listener is the essence of the app
 * When pressing 'Enter' process the string from 'UI_inputCommand'..
 * .. and send it with a function to the server to..
 * .. destructuring the string and interpret the:
 *   - list
 *   - command
 *   - todo
 *   - note
 */
UI_inputCommand.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    clientFunctions.processCommand(UI_inputCommand, user);
    clientFunctions.emptyAndFocusTarget(UI_inputCommand);
    // clientFunctions.animateCSS('#output', 'fadeInRightBig');
  }
});

// Toggle/Un-toggle the command input with ESC or INSERT
window.addEventListener('keyup', e => {
  // ! Toggle Console
  if (e.ctrlKey && e.key == 'ö') {
    console.log(window.containerPositions);
    if (UI_inputCommand === document.activeElement) {
      UI_inputCommand.blur();
    } else {
      UI_inputCommand.focus();
    }
  }

  // ! Scroll Down
  if (e.altKey && e.key == 'ArrowDown') {
    clientFunctions.animateCSS({
      multiple: true,
      target: '.todos__container',
      traits: ['pulse'],
    });
    let nextPosition;
    clientFunctions.scanTodosContainers();

    if (position >= 0 && position < window.containerPositions.length - 1) {
      nextPosition = position + 1;
      position = nextPosition;
    } else if (position == window.containerPositions.length - 1) {
      nextPosition = 0;
      position = 0;
    }
    window.scrollTo(0, window.containerPositions[nextPosition]);
  }

  // ! Scroll Up
  if (e.altKey && e.key == 'ArrowUp') {
    let prevPosition;
    clientFunctions.scanTodosContainers();

    if (position === 0) {
      prevPosition = window.containerPositions.length - 1;
      position = prevPosition;
    } else if (
      position > 0 &&
      position <= window.containerPositions.length - 1
    ) {
      prevPosition = position - 1;
      position = prevPosition;
    }

    window.scrollTo(0, window.containerPositions[prevPosition]);
  }

  e.preventDefault();
});
