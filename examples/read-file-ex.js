try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
  var thunkify = require('aa-thunkify');
}

var fs = require('fs');

// read file - ファイル読み込み
var readFile = thunkify(fs.readFile);
readFile('read-file-ex.js', 'utf8')(function (err, buff) {
  var str = buff.toString();
  // str...
  console.log(str);
});
