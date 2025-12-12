// - Generate a cycle of elements [1,2,3,4,5] => [1,2,3,4,5,1,2,3,4,5,...]

function* cyclerGenerator(values) {
  let i = 0;
  while (true) {
    yield values[i++ % values.length];
  }
}
const cycler = cyclerGenerator([1, 2, 3, 4, 5]);
console.log([...cycler.take(11)]);
