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
      callbacks.call(arguments);
    };

    fn.apply(ctx, arguments);

    // return yieldable promise
    return callbacks.call;

  }; // thunk
} // thunkify

exports = module.exports = thunkify;

// class: Callbacks
// method: call(arguments/callback function) for yieldable/promise
// usage:
//  var callbacks = new Callbacks(this);
//
//  function callback() {
//    callbacks.call(arguments);
//  }
//
//  // return yieldable
//  return callbacks.call;

function Callbacks(ctx) {
  var results, callbacks = [];
  this.call = call;
  call.then = then;
  call.done = then;
  call.error = error;
  call['catch'] = error;

  // yieldable/call callbacks
  function call(args) {
    // push callback function
    if (typeof args === 'function') {
      callbacks.push({fn: args, called: false});
    }

    // set arguments object for callback results
    else if (typeof args === 'object') {
      if (!results) results = args;
    }
    else {
      throw new Error('invalid arguments for call (Callbacks) type: ' + typeof args);
    }

    // not unsolved
    if (!results) return;

    callbacks.forEach(function (callback) {
      if (callback.called) return;
      callback.called = true;
      callback.fn.apply(ctx, results);
    }); // callbacks.forEach
  } // call

  // Promise then/done
  function then(resolved, rejected) {
    var cb = new Callbacks(ctx);
    call(function (err, data) {
      var res;
      if (err) {
        var args = arguments;
        function errArgs() { cb.call(args); }
        if (rejected) res = rejected(err);
        if (isPromise(res))
          return res.then(errArgs, errArgs);
        if (typeof res === 'function') // isThunk
          return res(errArgs);
        return cb.call(args);
      }
      else {
        function errThru() { cb.call(arguments); }
        if (resolved) res = resolved(data);
        if (isPromise(res)) {
          return res.then(
            function (res) { cb.call([null, res]); },
            errThru
          );
        } // isPromise
        if (typeof res === 'function') // isThunk
          return res(errThru);
        if (res === undefined) res = data;
        return cb.call([null, res]);
      }
    }); // call
    return cb.call; // return yieldable promise
  }

  // Promise catch/error
  function error(rejected) {
    return then(undefined, rejected);
  }
}

exports.Callbacks = Callbacks;

function isPromise(promise) {
  return promise && promise.then && typeof promise.then === 'function';
}

// TODO: NYI(Not Yet Implemented) Promise all race

})();
