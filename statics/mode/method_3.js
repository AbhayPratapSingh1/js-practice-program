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

function mode(data) {
  const sortedData = sort(data);
  let maxFreqElement = [data[0]];
  let maxFreq = 1;
  let currElement = data[0];
  let currFreq = 1;
  for (let index = 1; index < sortedData.length; index++) {
    if (sortedData[index] !== currElement) {
      if (currFreq > maxFreq) {
        maxFreq = currFreq;
        maxFreqElement = [currElement];
      } else if (currFreq === maxFreq) {
        maxFreqElement.push(sortedData[index]);
      }
      currFreq = 1;
      currElement = sortedData[index];
    } else {
      currFreq++;
    }
  }

  return maxFreqElement;
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

console.log(mode(data).join(", "));
