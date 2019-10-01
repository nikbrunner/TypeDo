import {
    readTodoCollection,
    createTask,
    emptyAndFocusTarget,
} from './clientFunctions.js';

// DOM Elements
const UI_inputCommand = document.querySelector('#UI_inputCommand');
const UI_output = document.querySelector('#UI_output');

const init = () => {
    readTodoCollection('nibru');
    emptyAndFocusTarget(UI_inputCommand);
};

init();

// Event Listeners
UI_inputCommand.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        createTask(UI_inputCommand);
        emptyAndFocusTarget(UI_inputCommand);
    }
});

window.addEventListener('keyup', e => {
    if (e.key == 'Insert' || e.key == 'Escape') {
        if (UI_inputCommand === document.activeElement) {
            UI_inputCommand.blur();
        } else {
            UI_inputCommand.focus();
        }
    }
});
