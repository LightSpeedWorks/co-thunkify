aa-thunkify - async-await-thunkify
===========

  Turn a regular node function into one which returns a thunk,
  useful for generator-based flow control.

  [Japanese version/日本語版](README_JP.md)

Installation
------------

```sh
$ npm install aa-thunkify
```

Example
-------

### read file sample

```js
var thunkify = require('aa-thunkify');
var fs = require('fs');

// read file
var readFile = thunkify(fs.readFile);
readFile('package.json', 'utf8')(function (err, buff){
  var str = buff.toString();
  // str...
});
```

### timer sample

```js
// timer
var timer = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

timer(3000)(function () {
  console.log('3 seconds later...');
});
```

License
-------

  MIT
