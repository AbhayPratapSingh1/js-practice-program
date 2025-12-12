// - iterate(f,x) => f(x), f(f(x)), f(f(f(x)))

function* functionOverFunctionGenerator(fn, value) {
  let lastValue = value;
  while (true) {
    yield lastValue;
    lastValue = fn(lastValue);
  }
}

const itr = functionOverFunctionGenerator((x) => x * 2, 1);
console.log([...itr.take(10)]);
