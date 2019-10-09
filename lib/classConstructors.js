const moment = require('moment');
const uuidv4 = require('uuid/v4');

class Command {
  constructor(input) {
    this.input = input;
    this.note = this.note();
    this.list = this.list();
    // this.important = this.important();
    this.cmd = this.cmd();
    this.title = this.title();
  }
  get cmdIndexStart() {
    return this.input.indexOf('-');
  }
  get cmdIndexEnd() {
    return this.cmdIndexStart + 3;
  }
  get noteIndexStart() {
    return this.input.indexOf("'");
  }
  get noteIndexEnd() {
    return this.input.lastIndexOf("'");
  }
  get importantIndex() {
    return this.input.indexOf('!');
  }
  list() {
    let list = this.input.substring(0, this.cmdIndexStart - 1);
    if (list === '') return undefined;
    else return list;
  }
  cmd() {
    let cmd = this.input
      .substring(this.cmdIndexStart, this.cmdIndexEnd)
      .toLowerCase();
    if (cmd === '') return undefined;
    else return cmd;
  }
  title() {
    if (this.note === undefined) {
      let title = this.input.substring(
        this.cmdIndexEnd + 1,
        this.input.length
      );

      if (title === '') return undefined;
      else return title;
    } else {
      let title = this.input.substring(
        this.cmdIndexEnd + 1,
        this.noteIndexStart - 1
      );

      if (title === '') return undefined;
      else return title;
    }
  }
  note() {
    let note = this.input.substring(
      this.noteIndexStart + 1,
      this.noteIndexEnd
    );
    if (note == '') return undefined;
    else return note;
  }
  printCommand() {
    console.log('input: ' + this.input);
    console.log('list: ' + this.list);
    console.log('cmd: ' + this.cmd);
    console.log('title: ' + this.title);
    console.log('note: ' + this.note);
  }
}

class Todo {
  constructor(command, clientId) {
    this.clientId = clientId;
    this.serverId = uuidv4();
    // this.important = command.important;
    this.list = command.list;
    this.title = command.title;
    this.note = command.note;
    this.dateCreated = moment().format('L');
  }
}

module.exports = { Command, Todo };
