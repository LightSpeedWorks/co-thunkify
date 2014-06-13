// thunkify.js

(function () {
'use strict';

// thunkify(fn) or
// thunkify(ctx, fn) or
// thunkify.call(ctx, fn)
function thunkify(ctx, fn) {
  // (fn)
  if (typeof fn !== 'function')
    fn = ctx, ctx = this;

  // (ctx, fn)
  if (typeof fn !== 'function')
    throw new TypeError('argument must be a function');

  // return thunk
  return function thunk() {
    var callbacks = new Callbacks(ctx);

    arguments[arguments.length++] = function callback() {
      callbacks.callback(arguments);
    };

    fn.apply(ctx, arguments);

    // return yieldable promise
    return callbacks.callback;

  }; // thunk
} // thunkify

exports = module.exports = thunkify;

// class: Callbacks
// method: callback(arguments/callback function) for yieldable/promise
// usage:
//  var callbacks = new Callbacks(this);
//
//  function callback() {
//    callbacks.callback(arguments);
//  }
//
//  // return yieldable
//  return callbacks.callback;

function Callbacks(ctx) {
  var results, callbacks = [];
  this.callback = callback;
  callback.then = then;
  callback.done = then;
  callback.error = error;
  callback['catch'] = error;

  // yieldable/callback callbacks
  function callback(args) {
    // push callback function
    if (typeof args === 'function') {
      callbacks.push({fn: args, called: false});
    }

    // set arguments object for callback results
    else if (typeof args === 'object') {
      if (!results) results = args;
    }
    else {
      throw new Error('invalid arguments for callback (Callbacks) type: ' + typeof args);
    }

    // not unsolved
    if (!results) return;

    callbacks.forEach(function (callback) {
      if (callback.called) return;
      callback.called = true;
      callback.fn.apply(ctx, results);
    }); // callbacks.forEach
  } // callback

  // Promise then/done
  function then(resolved, rejected) {
    var cb = new Callbacks(ctx);
    callback(function (err, data) {
      var res;
      if (err) {
        var args = arguments;
        function errArgs() { cb.callback(args); }
        if (rejected) res = rejected(err);
        if (isPromise(res))
          return res.then(errArgs, errArgs);
        if (typeof res === 'function') // isThunk
          return res(errArgs);
        return cb.callback(args);
      }
      else {
        function errThru() { cb.callback(arguments); }
        if (resolved) res = resolved(data);
        if (isPromise(res)) {
          return res.then(
            function (res) { cb.callback([null, res]); },
            errThru
          );
        } // isPromise
        if (typeof res === 'function') // isThunk
          return res(errThru);
        if (res === undefined) res = data;
        return cb.callback([null, res]);
      }
    }); // callback
    return cb.callback; // return yieldable promise
  } // then/done

  // Promise catch/error
  function error(rejected) {
    return then(undefined, rejected);
  } // catch/error
}

exports.Callbacks = Callbacks;

function isPromise(promise) {
  return promise && promise.then && typeof promise.then === 'function';
}

// TODO: NYI(Not Yet Implemented) Promise all race

})();
