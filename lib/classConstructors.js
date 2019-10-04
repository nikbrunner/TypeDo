const moment = require("moment");
const uuidv4 = require("uuid/v4");

class Command {
  constructor(input) {
    this.input = input;
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
  get list() {
    return this.input.substring(0, this.cmdIndexStart - 1);
  }
  get cmd() {
    return this.input.substring(this.cmdIndexStart, this.cmdIndexEnd).toLowerCase();
  }
  get title() {
    if (this.note == " ") {
      return this.input.substring(this.cmdIndexEnd + 1, this.input.length);
    } else {
      return this.input.substring(this.cmdIndexEnd + 1, this.noteIndexStart - 1);
    }
  }
  get note() {
    let note = this.input.substring(this.noteIndexStart + 1, this.noteIndexEnd);
    if (note == "") {
      return " ";
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
