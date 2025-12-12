// - Flipped consecutive elements [1,2,3,4] => [2,1,4,3];

function* flippedConsecutiveGenerator(values) {
  const ending = values.length % 2 === 0 ? values.length : values.length - 1;
  for (let index = 0; index < ending; index += 2) {
    yield [values[index + 1], values[index]];
  }
  if (ending !== values.length) {
    yield [values.at(-1)];
  }
}

const flippedIterator = flippedConsecutiveGenerator([1, 2, 3, 4]);
console.log(...flippedIterator);
