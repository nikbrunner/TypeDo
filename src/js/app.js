// ! === IMPORTS
import * as clientFunctions from "./clientFunctions.js";

// ! === DOM ELEMENTS
const UI_inputCommand = document.querySelector("#UI_inputCommand");
const user = "nibru";

// ! === INIT FUNCTION TO SET UP STARTUP
const init = () => {
  clientFunctions.readTodoCollection(user);
  clientFunctions.emptyAndFocusTarget(UI_inputCommand);
};

init();

// ! === EVENT LISTENERS
/* This first Event Listener is the essence of the app
 * When pressing 'Enter' process the string from 'UI_inputCommand'..
 * .. and send it with a function to the server to..
 * .. destructurize the string and interpret the:
 *   - list
 *   - command
 *   - todo
 *   - note
 */
UI_inputCommand.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    clientFunctions.processCommand(UI_inputCommand, user);
    clientFunctions.emptyAndFocusTarget(UI_inputCommand);
  }
});

// Toggle/Untoggle the command input with ESC or INSERT
window.addEventListener("keyup", e => {
  if (e.key == "Insert" || e.key == "Escape") {
    if (UI_inputCommand === document.activeElement) {
      UI_inputCommand.blur();
    } else {
      UI_inputCommand.focus();
    }
  }
});
