export const readTodoCollection = userId => {
    const readTodoCollection = new Request('/readTodoCollection', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
        }),
    });
    fetch(readTodoCollection)
        .then(res => res.json(), err => console.log(err))
        .then(res => {
            console.log(res);
            res = JSON.stringify(res);
            UI_output.innerHTML = res;
        });
};

export const createTask = input => {
    let createTask = new Request('/createTask', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            command: input.value,
        }),
    });

    fetch(createTask)
        .then(res => res.json(), err => console.log(err))
        .then(res => {
            res = JSON.stringify(res);
            UI_output.innerHTML = res;
        });
};

export const emptyAndFocusTarget = target => {
    if (target) target.value = '';
    target.focus();
};
