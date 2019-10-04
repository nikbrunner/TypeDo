const moment = require("moment");
const uuidv4 = require("uuid/v4");

class Command {
  constructor(input) {
    this.input = input;
    this.note = this.note();
    this.list = this.list();
    this.cmd = this.cmd();
    this.title = this.title();
  }
  get cmdIndexStart() {
    return this.input.indexOf("-");
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
  list() {
    return this.input.substring(0, this.cmdIndexStart - 1);
  }
  cmd() {
    return this.input.substring(this.cmdIndexStart, this.cmdIndexEnd).toLowerCase();
  }
  title() {
    if (this.note == "") {
      return this.input.substring(this.cmdIndexEnd + 1, this.input.length);
    } else {
      return this.input.substring(this.cmdIndexEnd + 1, this.noteIndexStart - 1);
    }
  }
  note() {
    let note = this.input.substring(this.noteIndexStart + 1, this.noteIndexEnd);
    if (note == "") {
      return "";
    } else {
      return note;
    }
  }
  get test() {
    console.log(this.input);
    console.log(this.list);
    console.log(this.cmd);
    console.log(this.title);
    console.log(this.note);
  }
}

class Todo {
  constructor(command, clientId) {
    this.clientId = clientId;
    this.serverId = uuidv4();
    this.list = command.list;
    this.title = command.title;
    this.note = command.note;
    this.dateCreated = moment().format("L");
    this.completed = false;
  }
}

module.exports = {Command, Todo};
