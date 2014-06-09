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

var n = 0;

// random - 眠る
var random = thunkify(function (v, cb) {
  var m = 0;
  ++n;
  setTimeout(function () {
    if (m++ === 0) console.log('s:' + v + n); cb(null, 'suc: ' + v + n);
  }, Math.random() * 100 + 100);
  setTimeout(function () {
    if (m++ === 0) console.log('e:' + v + n); cb(new Error('err ' + v + n));
  }, Math.random() * 100 + 100);
});

console.log('random start...');
random('ax')
.then(function (res) {
  console.log('1 success... ' + res);
  return random('bx');
}, function (err) {
  console.log('1 error... ' + err);
  return random('by');
})
.then(function (res) {
  console.log('2 success... ' + res);
  return random('cx');
}, function (err) {
  console.log('2 error... ' + err);
  return random('cy');
})
.then(function (res) {
  console.log('3 success... ' + res);
  return random('dx');
}, function (err) {
  console.log('3 error... ' + err);
  return random('dy');
})
.catch(function (err) {
  console.log('4 error... ' + err);
  return random('ey');
})
.then(function (res) {
  console.log('5 success... ' + res);
  return random('fx');
}, function (err) {
  console.log('5 error... ' + err);
  return random('fy');
});

