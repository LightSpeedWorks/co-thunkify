'use strict';

try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  console.log('../lib/thunkify ' + err.stack);
  var thunkify = require('co-thunkify');
}
var co = require('co');

// sleep - スリープ
var sleep = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

co(function*(){
  console.log('sleep start...');
  yield sleep(3000);
  console.log('3 seconds later...');

  var t = sleep(500);
  yield t;
  console.log('0.5 seconds later... (1)');
  yield t;
  console.log('0.5 seconds later... (2)');
})();
