aa-thunkify - async-await-thunkify
===========

  通常の Node の関数を thunk を返す関数に変換します。
  ジェネレータ・ベースのフロー制御に非常に使い易いものになります。

インストレーション
------------

```sh
$ npm install aa-thunkify
```

使用例
-------

### ファイル読み込みサンプル

```js
var thunkify = require('aa-thunkify');
var fs = require('fs');

// ファイル読み込み
var readFile = thunkify(fs.readFile);
readFile('package.json', 'utf8')(function (err, buff){
  var str = buff.toString();
  // str...
});
```

### タイマーサンプル

```js
// タイマー
var timer = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

timer(3000)(function () {
  console.log('3 seconds later...');
});
```

ライセンス
-------

  MIT
