# TypeDo

## Functionality

### Syntax

> list | cmd | item

### Commands

Each Command should have 3 characters where the first one is always a dash -

| Command | Description          |
| ------- | -------------------- |
| -td     | Add a item item      |
| -nt     | Add a note item      |
| -xx     | Remove an item       |
| -clear  | Clear the whole list |

### Examples

```
general -td walk the dog
```

```
general -td walk the dog
```

### Code

_..To destructoring the inputstrings._

```js
const item = 'work -nt life is changing';
const cmdIndexStart = item.indexOf('-');
const cmdIndexEnd = cmdIndexStart + 3;
const cmd = item.substring(cmdIndexStart, cmdIndexEnd);

const itemList = item.substring(0, cmdIndexStart - 1);
const itemTitle = item.substring(cmdIndexEnd + 1, item.length);

console.log(cmd);
console.log(itemList);
console.log(itemTitle);
```

## Lists

- General
- Work
- C1-4
