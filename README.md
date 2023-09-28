Replace your template engine with pure JavaScript by leveraging the power of [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

Inspired by [html-template-tag](https://github.com/AntonioVdlC/html-template-tag).

## Installation

```shell
npm i @gurgunday/html
```

## API Reference

The main export of the package is the `html` function that can be used to tag template literals and escape their expressions. To bypass escaping an expression, prefix it with `!`.

Node.js (and Deno) users also have access to the `includeFile` function (`includeFileDeno` in Deno) that reads and outputs the content of a given file and then caches it for future use.

## Usage

```js
import { html } from "@gurgunday/html";

const username = '<img src="https://example.com/hacker.png">';
const greeting = html`<h1>Hello, ${username}!</h1>`;

console.log(greeting);
// Output: <h1>Hello, &lt;img src=&quot;https://example.com/hacker.png&quot;&gt;</h1>

const img = '<img src="https://example.com/safe.png">';
const container = html`<div>!${img}</div>`;

console.log(container);
// Output: <div><img src="https://example.com/safe.png"></div>
```

The `includeFile` function returns the content of a file. Again, remember that it also caches the result in memory, so any subsequent modifications to the same file won't be reflected until the app is restarted:

```js
import { includeFile } from "@gurgunday/html/includeFile.js";

const logo = includeFile("static/logo.svg");

console.log(logo);
// Output: content of "static/logo.svg"
```
