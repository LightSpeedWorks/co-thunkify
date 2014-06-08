// STATE
var STATE = {UNRESOLVED: 'unresolved', RESOLVED: 'resolved', REJECTED: 'rejected'};

// Promise
function Promise(setup) {
  var state = STATE.UNRESOLVED;
  var bombs = [];
  var result;
  var ctx = null;

  // resolve
  function resolve(res) {
    if (!result) result = arguments;
    if (state === STATE.UNRESOLVED)
      state = STATE.RESOLVED;
    fire();
  } // resolve

  // reject
  function reject(err) {
    if (!result) result = arguments;
    if (state === STATE.UNRESOLVED)
      state = STATE.REJECTED;
    fire();
  } // reject

  // then
  this.then = then;
  function then(resolved, rejected) {
    var pr = new Promise();
    bombs.push({cb:resolved, eb:rejected, called:false, pr:pr});
    if (state !== STATE.UNRESOLVED) fire();
    return pr;
  } // then

  // catch
  this.catch = function (rejected) {
    return this.then(undefined, rejected);
  } // catch

  // fire
  function fire() {
    if (state === STATE.UNRESOLVED)
      throw new Error('BUG: state is invalid');

    bombs.forEach(function (bomb) {
      if (bomb.called) return;
      bomb.called = true;
      var pp;
      if (state === STATE.RESOLVED) {
        if (bomb.cb) pp = bomb.cb.apply(ctx, result);
        if (bomb.pr && pp && pp.then) {
          pp.then(function () {
            bomb.pr.resolve.apply(ctx, arguments);
          });
        } else
            bomb.pr.resolve.call(ctx, pp);
      } else { // REJECTED
        if (bomb.eb) pp = bomb.eb.apply(ctx, result);
        if (bomb.pr && pp && pp.then) {
          pp.then(undefined, function () {
            bomb.pr.reject.apply(ctx, arguments);
          });
        } else
            bomb.pr.reject.call(ctx, pp);
      }
    }); // bombs.forEach
  } // fire

  if (setup && typeof setup === 'function')
    setup(resolve, reject);
  else {
    this.resolve = resolve;
    this.reject = reject;
  }

} // Promise

var no = 0;
// timer
function timer(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () { resolve(++no); }, ms)  // 1•bŒã‚É‚±‚Ìpromise‚ð‰ðŒˆ‚·‚é
  });
} // timer

// main
console.log('start');
timer(500).then(function (res) {
  console.log('first', res);
  return timer(500);
}).then(function (res) {
  console.log('second', res);
  return 333; //return timer(500);
}).then(function (res) {
  console.log('third', res);
});

