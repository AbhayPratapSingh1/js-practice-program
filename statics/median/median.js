

function sort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length / 2; i++) {
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


function median(data) {
  const sortedData = sort(data);
  const middleIndex = Math.floor(data.length / 2)
  return sortedData[middleIndex];
}

function randomNumberBetween(first = 0, last = 1) {
  return first + (Math.floor(Math.random() * (last - first)));
}

function randomArray(numberOfTerms, st = 1, end = 100) {
  const randomData = [];
  for (let index = 0; index < numberOfTerms; index++) {
    randomData.push(randomNumberBetween(st, end));
  }
  return randomData;
}

const data = randomArray(20, 1, 6);
console.log(data);

console.log("median :", median(data));