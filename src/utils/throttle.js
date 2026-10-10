// Vanilla throttle implementation
export function throttle(fn, delay, ...args1) {
  let isThrottled = false;
  let nextArgs = null;

  return function throttledFunc(...args2) {
    if (isThrottled) {
      nextArgs = args2;
      return;
    }

    isThrottled = true;

    fn.call(this, ...args1, ...args2);

    setTimeout(function () {
      isThrottled = false;

      if (nextArgs !== null) {
        throttledFunc(...nextArgs);
        nextArgs = null;
      }
    }, delay);
  };
}

// Examples
// function func(args) {
//   console.log(`Func called with ${args}`);
// }

// const throttledFunc = throttle(func, 100);

// throttledFunc('cat');
// throttledFunc('bat');
// throttledFunc('mat');
// throttledFunc('rat');
