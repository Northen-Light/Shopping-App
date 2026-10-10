// Vanilla debounce implementation
export function debounce(fn, delay, ...args1) {
  let timerId;

  return function (...args2) {
    const that = this;

    clearTimeout(timerId);

    timerId = setTimeout(function () {
      fn.call(that, ...args1, args2);
    }, delay);
  };
}

// Examples
// function func(args) {
//   console.log(`Func called with ${args}`);
// }

// const debouncedFunc = debounce(func, 100);

// debouncedFunc('cat');
// debouncedFunc('bat');
// debouncedFunc('mat');

// setTimeout(() => debouncedFunc('rat'), 90);
