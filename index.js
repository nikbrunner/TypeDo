// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// ! === IMPORT NPM
const chalk = require("chalk");
const moment = require("moment");

// ! === EXPRESS SERVER
const express = require("express");
const server = express();
const PORT = 5000;
server.use(express.static("public"));

// ! === EXPRESS ROUTER
const router = require("./router");
server.use("/", router);

// ! === SERVER LISTEN
server.listen(PORT, err => {
  console.log(
    err ||
      chalk.whiteBright("::: ") +
        chalk.greenBright.bold(`Server running on `) +
        chalk.cyanBright.bold(`Port ${PORT} `) +
        chalk.magentaBright.bold(`since ${moment().format("LT")} `) +
        chalk.whiteBright(" :::")
  );
  console.log(
    chalk.whiteBright("::: ") +
      chalk.yellowBright.bold("         Use this port as client!         ") +
      chalk.whiteBright(" :::")
  );
});
