try {
  var thunkify = require('../lib/thunkify');
} catch(err) {
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
