function maxFrequenctElemets(data, axis = 1, returnAxis = 0) {
  let maxElements = [];
  let maxValue = -Infinity;
  for (let index = 0; index < data.length; index++) {
    if (data[index][axis] === maxValue) {
      maxElements.push(data[index][returnAxis]);
    } else if (data[index][axis] > maxValue) {
      maxValue = data[index][axis];
      maxElements = [data[index][returnAxis]];
    }
  }
  return maxElements;
}

function mode(data) {
  const elementFrequency = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let isNotInside = true;
    let eleIndex = 0;
    while (eleIndex < elementFrequency.length && isNotInside) {
      const curCheckingElement = elementFrequency[eleIndex];
      if (curCheckingElement[0] === element) {
        elementFrequency[eleIndex][1] += 1;
        isNotInside = false;
      }
      eleIndex++;
    }
    if (isNotInside) {
      elementFrequency.push([element, 1]);
    }
  }
  return maxFrequenctElemets(elementFrequency);
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
