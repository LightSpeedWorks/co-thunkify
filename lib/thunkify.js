// thunkify.js

(function () {
'use strict';

// thunkify(fn) or
// thunkify(ctx, fn) or
// thunkify.call(ctx, fn)
function thunkify(ctx, fn) {
  // fn
  if (typeof fn !== 'function')
    fn = ctx, ctx = this;

  // ctx, fn
  if (typeof fn !== 'function')
    throw new TypeError('argument must be a function');

  return function () {
    var results, bombs = []; // bomb = {cb: fn, called: false};

    arguments[arguments.length++] = function () {
      if (!results) results = arguments;
      fire();
    };

    fn.apply(ctx, arguments);

    return function (fn) {
      bombs.push({cb: fn, called: false});
      if (!results) return;
      fire();
    };

    function fire() {
      bombs.forEach(function (bomb) {
        if (bomb.called) return;
        bomb.called = true;
        bomb.cb.apply(ctx, results);
      }); // bombs.forEach
    } // fire

  };
} // thunkify

exports = module.exports = thunkify;

})();
