try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  var thunkify = require('aa-thunkify');
}
var co = require('co');

// timer - タイマー
var timer = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

timer(5000);

co(function*(){
  console.log('timer start...');
  yield timer(3000);
  console.log('3 seconds later...');

  var t = timer(500);
  yield t;
  console.log('0.5 seconds later... (1)');
  yield t;
  console.log('0.5 seconds later... (2)');
})();
