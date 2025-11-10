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



const modifyData = function (data, modifierFunc) {
  const modifiedData = [];
  for (let index = 0; index < data.length; index++) {
    const value = data[index];
    modifiedData.push(modifierFunc(value));
  }
  return modifiedData;
}


function recursiveOperation(data, operation) {
  let modifingValue = data[0];
  for (let index = 1; index < data.length; index++) {
    const value = data[index];
    modifingValue = operation(modifingValue, value);
  }
  return modifingValue;
}
function add(val1, val2) {
  return val1 + val2;
}

function mean(data) {
  return recursiveOperation(data, add) / data.length;
}

const sum = function (val1, val2) {
  return val1 + val2;
}

const square = function (value) {
  return value ** 2;
}

function variance(data) {
  const squaredValues = modifyData(data, square);
  return recursiveOperation(squaredValues, sum)
}

const deviation = function (data) {
  const dataVariance = variance(data);
  return Math.sqrt(dataVariance / data.length);
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

const data = randomArray(3, 1, 6);
console.log(data);

console.log("Standard Devation :", deviation(data));