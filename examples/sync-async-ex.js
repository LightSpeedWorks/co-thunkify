try {
  var thunkify = require('aa-thunkify');
} catch(err) {
  var thunkify = require('../lib/thunkify');
}

var start = new Date;
function tm() {
  return 'time = ' + (new Date - start)/1000.0;
}

// sync - 同期
var sync = thunkify(function (a, b, cb) {
  cb(null, a + b);
  cb(null, b - a);  // 2nd callback ignored
});

sync(12, 34)(function (err, result) {
  console.log('sync 1: result =', result, tm());
});

var th = sync(12, 34);
th(function (err, result) {
  console.log('sync 2: result =', result, tm());
});
th(function (err, result) {
  console.log('sync 2: ignored =', result, tm());  // 2nd thunk ignored
});

// async - 非同期
var async = thunkify(function (a, b, cb) {
  setTimeout(function () { cb(null, a + b); }, 400);
  setTimeout(function () { cb(null, b - a); }, 600);  // 2nd callback ignored
});

async(12, 34)(function (err, result) {
  console.log('async 1: result =', result, tm());
});

var th = async(12, 34);
setTimeout(function () {
  th(function (err, result) {
    console.log('async 2: result =', result, tm());
  });
  th(function (err, result) {
    console.log('async 2: ignored =', result, tm());  // 2nd thunk ignored
  });
}, 200);

var th = async(12, 34);
setTimeout(function () {
  th(function (err, result) {
    console.log('async 3: result =', result, tm());
  });
  th(function (err, result) {
    console.log('async 3: ignored =', result, tm());  // 2nd thunk ignored
  });
}, 800);
