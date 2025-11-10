let numberOfTimes = 0;

function sort2(data) {
  const sortedData = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length - 1; j++) {
      if (sortedData[i] > sortedData[j]) {

        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
    }
  }
  return sortedData;
}

function sort(data) {
  const sortedData = data.slice();
  const lastRange = data.length / 2;
  for (let i = 0; i < lastRange; i++) {
    const lastValIndex = data.length - i;

    for (let j = i; j < lastValIndex; j++) {
      if (sortedData[i] > sortedData[j]) {
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
      if (sortedData[lastValIndex] < sortedData[j]) {
        const temp = sortedData[lastValIndex];
        sortedData[lastValIndex] = sortedData[j];
        sortedData[j] = temp;
      }
    }
  }
  return sortedData;
}

function randomNumberBetween(first = 0, last = 1) {
  return first + (Math.floor(Math.random() * (last - first)));
}

function randomArray(numberOfTerms) {
  const randomData = [];
  for (let index = 0; index < numberOfTerms; index++) {
    numberOfTimes++;
    randomData.push(randomNumberBetween(1, 100));
  }
  return randomData;
}

function benchmark(numberOfElements) {
  const numberData = randomArray(numberOfElements);
  sort(numberData);
  l
}

benchmark(100000)
