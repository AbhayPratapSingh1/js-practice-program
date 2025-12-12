// - Generate all pair permutations [1,2,3,4,5] =>
//   [[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],...]

function* permutationPairGenerator(values) {
  for (let p1 = 0; p1 < values.length; p1++) {
    for (let p2 = p1 + 1; p2 < values.length; p2++) {
      yield [values[p1], values[p2]];
    }
  }
}

const permutations = permutationPairGenerator([1, 2, 3, 4, 5]);
console.log([...permutations]);
