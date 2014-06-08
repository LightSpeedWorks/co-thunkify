[co-thunkify](https://www.npmjs.org/package/co-thunkify) - async await thunkify for `co`
==================================

  Turn a regular node function into one which returns a thunk,
  useful for generator-based flow control.

  [Japanese version/■日本語版はこちら■](README-JP.md#readme)

Installation
------------

```sh
$ npm install co-thunkify
```

[![npm][npm.png]][npm.lnk]
[npm.lnk]: https://nodei.co/npm/co-thunkify
[npm.png]: https://nodei.co/npm/co-thunkify.png

Examples
--------

### [read file sample](examples/read-file-ex.js)

```js
var thunkify = require('co-thunkify');
var fs = require('fs');

// read file
var readFile = thunkify(fs.readFile);
readFile('package.json', 'utf8')(function (err, buff) {
  var str = buff.toString();
  // str...
});
```

### [timer sample](examples/timer-ex.js)

```js
var thunkify = require('co-thunkify');

// timer
var timer = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

console.log('timer start...');
timer(3000)(function () {
  console.log('3 seconds later...');
});
```

### [sync and async sample](examples/sync-async-ex.js)

License
-------

  MIT
