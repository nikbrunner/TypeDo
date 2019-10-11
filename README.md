# TypeDo
<div>
<img src="https://i.ibb.co/RcMZtpZ/Type-Do-Logo.png" alt="Type-Do-Logo" border="0" width="250px">
</div>
A minimal, desktop and keyboard focused and performant todo app with multiple lists.

## ⚡ Functionality

- My primary goal was to create a todo app for practice and my own usage, which i can operate without a mouse and is very fast and enjoyable to use.

- You can toggle input console with a shortcut and write a command with parameters, like in a typical console. Just with the input string and based on the command parameters you have control the following arguments:

  - You can create a single **normal** todo in a list
  - You can create a single **important** todo in a list
  - You can complete / remove a **single** or **all** **todos** in a list
  - You can remove a **single** or **all** lists

<br>

- When a list doesn't exist, it gets automatically created and the item is added to it
- Data gets read and written from and in a JSON File to the NodeJS Server with the core module `fs`
- This app has currently no authentication and works only for me as a user

<br>

## 🏗 Command Syntax Structure

```
list | cmd | item | note
```

The note is **always optional**.

> Please check out the examples, to better understand the usage!

<br>

## 📚 Stack

| Name                                                       | Functionality                |
| ---------------------------------------------------------- | ---------------------------- |
| [NodeJS](https://nodejs.org/)                              | As server                    |
| [ExpressJS](http://expressjs.com/)                         | As server framework          |
| [ParcelJS](https://parceljs.org)                           | As bundler for the Front-End |
| [MomentJS](https://momentjs.com)                           | For timestamps               |
| [UUID](https://www.npmjs.com/package/uuidv4)               | For unique IDs               |
| [SCSS](https://sass-lang.com)                              | For styling                  |
| [animate.css](https://daneden.github.io/animate.css/)      | For animations               |
| [autoprefixer](https://www.npmjs.com/package/autoprefixer) | For vendor prefixes          |
| [normalize.css](http://necolas.github.io/normalize.css/)   | For browser consistency      |

<br>

## 🎛 Parameters & Keywords

| Parameter | Description                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| -td       | Add the text after the parameter as a todo <br> ( with an optional note in quotes ), <br> to the list declared before the parameter |
| -!        | Flag a Todo as important                                                                                                            |
| -rm       | Remove the selection after the parameter ( which can be a todo or a list )                                                          |
| \*        | Serves as a 'All' Selector and can be used before or after the parameters                                                           |

<br>

## ⌨ Shortcuts

| Shortcut                    | Functionality                             |
| --------------------------- | ----------------------------------------- |
| `CTRL + ö`                  | Toggles the Input Console (German Layout) |
| `ALT + ArrowUp / ArrowDown` | Switches between the lists                |

<br>

## 🕹 Examples

#### Creating _normal_ Todos

```
general -td walk the dog
```

This resolves to the following:

- In a list called **'general'**
- Create a **Todo**
- With the title **'walk the dog'**
- With **no** note

<br>

```
work -td call peter 'ask about project xy'
```

This resolves to the following:

- In a list called **'work'**
- Create a **Todo**
- With the title **'call peter'**
- With the note **'ask about project xy'**

<br>

#### Creating _important_ todos

```
general -td -! buy milk
```

This resolves to the following:

- In a list called **'general'**
- Create a **_important_ Todo**
- With the title **'buy milk'**
- With **no** note

<br>

```
health -td -! dentist appointment 'next week'
```

This resolves to the following:

- In a list called **'health'**
- Create a **_important_ Todo**
- With the title **'dentist appointment'**
- With the note **'next week'**

#### Completing / Removing todos

```
health -rm 2
```

This resolves to the following:

- In a list called **'health'**
- Remove a **Todo**
- With the ID **2**

<br>

```
health -rm *
```

This resolves to the following:

- In a list called **'health'**
- Remove **_all_ Todos**

#### Removing lists

> For removing lists you need to work with the `self` keyword for targeting the list.
> This is for semantic and security reasons.

<br>

```
health -rm self
```

This resolves to the following:

- Remove the list **'health'** completely

<br>

```
* -rm self
```

This resolves to the following:

- Remove **all lists** completely

<br>

## 🔭 Future Features

- Description
- Error Alert
- Authentication
- Removal of multiple todos
- Updating Todos
- Deploy to Heroku

<br>

## 🐞 Issues

- Sometimes i have a problem where i get an error for calculating the client todo-ID based on the todo collection object, where the function states the object ist `undefined`.
