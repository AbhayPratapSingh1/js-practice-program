// - partition by identity: [1,1,1,2,2,1,1,3,3,2] =>
//   [[1,1,1],[2,2],[1,1],[3,3],[2]] isEven: [1,3,1,2,2,1,1,3,5,2] =>
//   [[1,3,1],[2,2],[1,1,3,5],[2]]

function* chunkByPredicateGenerator(value, predicate) {
  let index = 0;
  while (index < value.length) {
    const vals = [value[index]];
    index++;
    while (
      predicate(value[index - 1]) === predicate(value[index]) &&
      index < value.length
    ) {
      vals.push(value[index]);
      index++;
    }
    yield vals;
  }
}

const chunkRemainderBy3 = chunkByPredicateGenerator(
  [1, 1, 1, 2, 2, 1, 1, 3, 3, 6, 6, 3, 3, 2],
  (v) => v % 3,
);

console.log([...chunkRemainderBy3]);
