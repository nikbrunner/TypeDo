const moment = require('moment');
const uuidv4 = require('uuid/v4');

class Command {
  constructor(input) {
    this.input = input;
    this.note = this.note();
    this.list = this.list();
    this.important = this.important();
    this.cmd = this.cmd();
    this.title = this.title();
  }
  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }
  get cmdIndexStart() {
    return this.input.indexOf('-');
    // this.getPosition(this.input, '-', 1);
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
  get importantIndexStart() {
    // return this.input.indexOf('!');
    return this.getPosition(this.input, '-', 2);
  }
  get importantIndexEnd() {
    return this.importantIndexStart + 2;
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
  important() {
    if (this.importantIndexStart === this.input.length) return false;
    else if (this.importantIndexStart < this.input.length) return true;
  }
  title() {
    if (this.important === true && this.note === undefined) {
      let title = this.input.substring(
        this.importantIndexEnd + 1,
        this.input.length
      );
      if (title === '') return undefined;
      else return title;
    } else if (this.important === true && this.note !== undefined) {
      let title = this.input.substring(
        this.importantIndexEnd + 1,
        this.noteIndexStart - 1
      );
      if (title === '') return undefined;
      else return title;
    } else if (this.important === false && this.note === undefined) {
      let title = this.input.substring(
        this.cmdIndexEnd + 1,
        this.input.length
      );
      if (title === '') return undefined;
      else return title;
    } else if (this.important === false && this.note !== undefined) {
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
    console.log('important: ' + this.important);
    console.log('title: ' + this.title);
    console.log('note: ' + this.note);
  }
}

class Todo {
  constructor(command, clientId) {
    this.clientId = clientId;
    this.serverId = uuidv4();
    this.important = command.important;
    this.list = command.list;
    this.title = command.title;
    this.note = command.note;
    this.dateCreated = moment().format('L');
  }
}

module.exports = { Command, Todo };
