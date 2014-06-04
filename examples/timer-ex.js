'use strict';

try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  console.log('../lib/thunkify ' + err);
  var thunkify = require('co-thunkify');
}

// timer - タイマー
var timer = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

console.log('timer start...');
timer(3000)(function () {
  console.log('3 seconds later...');
});
