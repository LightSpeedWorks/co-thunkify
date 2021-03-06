'use strict';

try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  console.log('../lib/thunkify ' + err.stack);
  var thunkify = require('co-thunkify');
}

var fs = require('fs');

// read file - ファイル読み込み
var readFile = thunkify(fs.readFile);
readFile('README.md', 'utf8')(function (err, buff) {
  var str = buff.toString();
  // str...
  console.log(str);
});
