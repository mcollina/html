Replace your template engine with pure JavaScript by leveraging the power of [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

Inspired by [html-template-tag](https://github.com/AntonioVdlC/html-template-tag).

## Installation

```shell
npm i @gurgunday/html
```

## API Reference

The package provides the `html` function that can be used to tag template literals and escape their expressions. To render an expression as raw HTML, prefix it with `!`.

Node.js users also have access to the `includeFile` function that outputs the content of a given file and caches it in memory.

## Usage

Import the `html` function:

```js
import { html } from "@gurgunday/html";
```

You can then tag a template literal to automatically escape expressions:

```js
const username = '<img src="https://example.com/hacker.png">';
const greeting = html`<h1>Hello, ${username}!</h1>`;

console.log(greeting);
// Output: <h1>Hello, &lt;img src=&quot;https://example.com/hacker.png&quot;&gt;</h1>
```

If you want to render raw HTML, you can prefix your expression with `!`. However, be aware that this does not escape potentially dangerous characters, so it should be used with caution:

```js
const dangerousHTML = '<img src="https://example.com/hacker.png">';
const rawHTML = html`<div>!${dangerousHTML}</div>`;

console.log(rawHTML);
// Output: <div><img src="https://example.com/hacker.png"></div>
```

The `includeFile` function is used to output the content of a file. Again, remember that it also caches the result, so any subsequent modifications to the same file won't be reflected until the app is restarted:

```js
import { includeFile } from "@gurgunday/html/includeFile.js";
const svgIcon = includeFile("src/static/logo.svg");

console.log(svgIcon);
// Output: content of "src/static/logo.svg"
```
