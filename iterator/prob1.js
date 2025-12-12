// - Generate sequences of consecutive pairs [1,2,3,4,5] =>
// [[1,2],[2,3],[3,4],[4,5]]

function* consecutivePairGenerator(values) {
  for (let index = 0; index < values.length - 1; index++) {
    yield [values[index], values[index + 1]];
  }
}
const sequences = consecutivePairGenerator([1, 2, 3, 4, 5]);

console.log([...sequences]);
