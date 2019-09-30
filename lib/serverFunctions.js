const calculateClientIdBasedOnListLength = (target, list) => {
    if (target.hasOwnProperty(list)) {
        let listLength = target[list].length;
        return listLength + 1;
    } else return 1;
};

const checkForExistingListsAndPushTodoToTarget = (target, list, todo) => {
    if (target.hasOwnProperty(list)) target[list].push(todo);
    else {
        target[list] = [];
        target[list].push(todo);
    }
};

module.exports = {
    calculateClientIdBasedOnListLength,
    checkForExistingListsAndPushTodoToTarget,
};
