function maxFrequenctElemets(elements, frequencies) {
  let maxElements = [];
  let maxValue = -Infinity;
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const frequency = frequencies[index];
    if (frequency === maxValue) {
      maxElements.push(element);
    } else if (frequency > maxValue) {
      maxValue = frequency;
      maxElements = [element];
    }
  }
  return maxElements;
}

function mode(data) {
  const uniqueElements = [];
  const frequency = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (uniqueElements.includes(element)) {
      const uniqueElementsIndex = uniqueElements.indexOf(element)
      frequency[uniqueElementsIndex]++;
    } else {
      uniqueElements.push(element);
      frequency.push(1);
    }
  }
  console.log(uniqueElements.join("  |  "));
  console.log(frequency.join("  |  "));
  return maxFrequenctElemets(uniqueElements, frequency);
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

console.log("Modes :", mode(data).join(", "));
