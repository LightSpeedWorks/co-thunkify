'use strict';

try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  console.log('../lib/thunkify ' + err.stack);
  var thunkify = require('co-thunkify');
}

// sleep - 眠る
var sleep = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

console.log('sleep start...');
sleep(3000).then(function () {
  console.log('3 seconds later...');
}).catch(function () {
  console.log('err?');
});
