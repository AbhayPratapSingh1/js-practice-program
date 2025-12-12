// - Prime number series

const isPrime = (num) => {
  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};
function* primeIterator() {
  let i = 2;
  while (true) {
    if (isPrime(i)) {
      yield i;
    }
    i++;
  }
}

const itr = primeIterator();

console.log([...itr.take(10)]);
