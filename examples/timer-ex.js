try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
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
