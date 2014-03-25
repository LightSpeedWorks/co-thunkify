// thunkify.js

'use strict';

function thunkify(fn) {
  return function () {
    var cb, results, called, ctx;
    arguments[arguments.length++] = function () {
      results = arguments;
      ctx = this;
      if (!cb || called) return;
      called = true;
      cb.apply(ctx, results);
    };

    fn.apply(this, arguments);

    return function (fn) {
      cb = fn;
      if (!results || called) return;
      called = true;
      cb.apply(ctx, results);
    };
  };
}

exports = module.exports = thunkify;
