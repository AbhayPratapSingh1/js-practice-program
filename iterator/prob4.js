// - Iterate over lines of text "this\nis\ngood" => ['this','is','good']

function* lineNextLineGenerator(value) {
  let i = 0;
  while (i < value.length && value.indexOf("\n", i + 1) !== -1) {
    yield value.slice(i, value.indexOf("\n", i + 1));
    i = value.indexOf("\n", i + 1) + 1;
  }
  yield value.slice(i);
}

const splitIterator = lineNextLineGenerator("this\nis\ngood");

console.log([...splitIterator.take(10)]);
