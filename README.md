# MAGIC 🧙🏻‍♂️ - A basic API server.

*Magic is a really simple to use NodeJS package to create a basic API server. It's designed to be easy to use and easy to understand, especially for beginners who are just starting out with NodeJS or want to learn more about how more complex frameworks like ExpressJS work.*

## Installation

To install Magic, simply run `npm install @magic-api/server` in your project directory.

## Usage (The basics)

To use Magic, you first need to import it into your project. To do this, add the following line to the top of your file:

```js
import { createMagic, Spell } from '@magic-api/server';
```

Next, you need to create a new instance of the Magic class. To do this, add the following line to your file:

```js
const magic = createMagic();
```

To add routes to your API just create a new Spell. All you need to do is to define a path. To do this, add the following line to your file:

```js
const spell = new Spell('/hi');
```

But your spell also needs to do something. To add a GET and POST request handler, just use the following code:

```js
spell.get((req, res) => {
  res.send('Hello world!');
});

spell.post((req, res) => {
  res.send('Hello world!');
});
```

Now that you have a spell, you need to add it to your Magic instance. To do this, add the following line to your file:

```js
magic.registerSpells([spell]);
```

That's it! Just start your server by listening on a port. 

```js
magic.listen(3000);
```

## Usage (Advanced)
*Adding more information soon...*