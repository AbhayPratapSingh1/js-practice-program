// - chunk 2: [1,2,3,4] => [[1,2],[3,4]]; 3,1: [1,2,3,4,5] => [[1,2,3],[3,4,5]];
//   3,2: [1,2,3,4,5] => [[1,2,3],[2,3,4],[3,4,5]];

function* chunkWithRepetitionGenerator(values, chunkSize, repetition = 0) {
  let lastCutIndex = 0;

  while (lastCutIndex < values.length - repetition) {
    yield values.slice(lastCutIndex, lastCutIndex + chunkSize);

    lastCutIndex += chunkSize - repetition;
  }
}

const chunks = chunkWithRepetitionGenerator([1, 2, 3, 4, 5], 4, 2);
const chunks2 = chunkWithRepetitionGenerator([1, 2, 3, 4, 5, 6], 4, 2);
const chunks3 = chunkWithRepetitionGenerator([1, 2, 3, 4, 5, 6, 7], 4, 2);
const chunks4 = chunkWithRepetitionGenerator([1, 2, 3, 4, 5, 6, 7, 8], 4, 2);
const chunks5 = chunkWithRepetitionGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9], 4, 2);
console.log([...chunks]);
console.log([...chunks2]);
console.log([...chunks3]);
console.log([...chunks4]);
console.log([...chunks5]);
