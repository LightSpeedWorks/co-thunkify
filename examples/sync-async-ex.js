'use strict';

try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  console.log('../lib/thunkify ' + err);
  var thunkify = require('co-thunkify');
}

var start = new Date;
function tm() {
  return 'time = ' + (new Date - start)/1000.0;
}

// sync - 同期
var sync = thunkify(function (a, b, cb) {
  cb(null, a + b);
  cb(null, b - a);  // 2nd callback result ignored
});

var th0 = sync(1, 2)
th0(function (err, result) {
  console.log('sync 1: result =', result, tm(), '(1)');
});
th0(function (err, result) {
  console.log('sync 1: result =', result, tm(), '(2)');
});

var th1 = sync(2, 3);
th1(function (err, result) {
  console.log('sync 2: result =', result, tm(), '(1)');
});
th1(function (err, result) {
  console.log('sync 2: result =', result, tm(), '(2)');
});

// async - 非同期
var async = thunkify(function (a, b, cb) {
  setTimeout(function () { cb(null, a + b); }, 400);
  setTimeout(function () { cb(null, b - a); }, 600);  // 2nd callback result ignored
});

var th2 = async(3, 4);
th2(function (err, result) {
  console.log('async 1: result =', result, tm(), '(1)');
});
th2(function (err, result) {
  console.log('async 1: result =', result, tm(), '(2)');
});

var th3 = async(4, 5);
setTimeout(function () {
  th3(function (err, result) {
    console.log('async 2: result =', result, tm(), '(1)');
  });
  th3(function (err, result) {
    console.log('async 2: result =', result, tm(), '(2)');
  });
}, 200);

var th4 = async(5, 6);
setTimeout(function () {
  th4(function (err, result) {
    console.log('async 3: result =', result, tm(), '(1)');
  });
  th4(function (err, result) {
    console.log('async 3: result =', result, tm(), '(2)');
  });
}, 500);

var th5 = async(6, 7);
setTimeout(function () {
  th5(function (err, result) {
    console.log('async 4: result =', result, tm(), '(1)');
  });
  th5(function (err, result) {
    console.log('async 4: result =', result, tm(), '(2)');
  });
}, 800);
