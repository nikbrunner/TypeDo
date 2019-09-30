import { createTask, clearOutput } from './functions.js';

// DOM Elements
const UI_inputCommand = document.querySelector('#UI_inputCommand');
const UI_btnTodoSubmit = document.querySelector('#UI_btnTodoSubmit');
const UI_output = document.querySelector('#UI_output');

UI_inputCommand.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        createTask(UI_inputCommand);
    }
});

UI_btnTodoSubmit.onclick = e => {
    createTask(UI_inputCommand);
};
