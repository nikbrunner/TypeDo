// https://www.npmjs.com/package/jsonfile

// Imports
const fs = require('fs');

// Variables
const dbPath = 'db/';
const dbFileFormat = '.json';
const dbFileCollectionPrefix = 'collection_';

const calculateClientIdBasedOnListLength = (target, list) => {
    if (target.hasOwnProperty(list)) {
        let listLength = target[list].length;
        return listLength + 1;
    } else return 1;
};

const checkForExistingListsAndPushTodoToTarget = (target, list, todo) => {
    list = list.toLowerCase();
    if (target.hasOwnProperty(list)) {
        target[list].push(todo);
        console.log('added');
    } else {
        target[list] = [];
        target[list].push(todo);
        console.log('not added');
    }
};

const writeTodoCollectionFile = (userId, content) => {
    return new Promise((resolve, reject) => {
        path = dbPath + dbFileCollectionPrefix + userId + dbFileFormat;

        content = JSON.stringify(content);

        fs.writeFile(path, content, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const readTodoCollectionFile = userId => {
    return new Promise((resolve, reject) => {
        path = dbPath + dbFileCollectionPrefix + userId + dbFileFormat;

        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                data = data.toString();
                resolve(data);
            }
        });
    });
};

module.exports = {
    calculateClientIdBasedOnListLength,
    checkForExistingListsAndPushTodoToTarget,
    writeTodoCollectionFile,
    readTodoCollectionFile,
};
