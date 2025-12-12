const fakeBinder = (fn, defThis, ...vars) => (...args) =>
  fn.call(defThis, ...vars, ...args);

const increment = function (val) {
  val += 1;
  return this + val;
};

const maper = (init) => {
  let i = init;
  return fakeBinder(increment, 1, i);
};

const a = maper(10);
console.log(a());
console.log(a());
console.log(a());
console.log(a());
console.log(a());


