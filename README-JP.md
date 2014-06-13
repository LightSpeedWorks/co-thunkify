[co-thunkify][npm.lnk] - async await thunkify for `co`
==================================

  [English version](README.md#readme)

  通常の Node の関数を thunk を返す関数に変換します。
  ジェネレータ・ベースのフロー制御に非常に使い易いものになります。

インストレーション
------------------

```sh
$ npm install co-thunkify
```

[![npm][npm.png]][npm.lnk]
[npm.lnk]: https://www.npmjs.org/package/co-thunkify
[npm.png]: https://nodei.co/npm/co-thunkify.png

使用例
------

### [ファイル読み込みの例](examples/read-file-ex.js)

```js
var thunkify = require('co-thunkify');
var fs = require('fs');

// ファイル読み込み
var readFile = thunkify(fs.readFile);
readFile('package.json', 'utf8')(function (err, buff) {
  var str = buff.toString();
  // str...
});
```

### [スリープの例](examples/sleep-ex.js)

```js
var thunkify = require('co-thunkify');

// スリープ
var sleep = thunkify(function (ms, cb) {
  setTimeout(cb, ms);
});

console.log('sleep start...');
sleep(3000)(function () {
  console.log('3 seconds later...');
});
```

### [同期と非同期の例](examples/sync-async-ex.js)

ライセンス
----------

  MIT
