


let numberOfTimes = 0;

function sort2(data) {
  numberOfTimes = 0;
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
  numberOfTimes = 0;
  const sortedData = data.slice();
  for (let i = 0; i < data.length / 2; i++) {
    const lastValIndex = data.length - i;

    for (let j = i; j < lastValIndex; j++) {
      numberOfTimes++;
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
    randomData.push(randomNumberBetween(1, 100));
  }
  return randomData;
}

function benchmark(numberOfElements) {
  const numberData = randomArray(numberOfElements);
  sort(numberData);
  console.log("Number of time :", numberOfTimes);
}

benchmark(100000)

function isDeepEqual(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }
    for (let index = 0; index < value1.length; index++) {
      if (!isDeepEqual(value1[index], value2[index])) {
        return false;
      }
    }
    return true;
  }
  return value1 === value2;
}

function printableArray(array) {
  const printableBuffer = []
  for (let index = 0; index < array.length; index++) {
    const printableElement = genPrintableInput(array[index]);
    printableBuffer.push(printableElement);
  }

  return "[" + printableBuffer.join(", ") + "]";
}

function genPrintableInput(value) {
  if (Array.isArray(value)) {
    return printableArray(value);
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return value + "";
}

function padst(value, times = 3) {
  return "\t".repeat(times) + value;
}

function testCase(description, input, expected) {
  const actual = sort(input);
  const isEqual = isDeepEqual(actual, expected);
  const icon = isEqual ? "✅" : "❌";
  let message = `\t ${(numberOfTimes + "").padStart(10)}\t${icon} ${description}\n`;
  if (true) {
    const prinatableInput = genPrintableInput(input);
    const prinatableActual = genPrintableInput(actual);
    const prinatableExpected = genPrintableInput(expected);
    const pad = padst("");
    message += `${pad}   | Input    : ${prinatableInput}\n${pad}   `
      + `| Actual   : ${prinatableActual}\n${pad}   `
      + `| Expected : ${prinatableExpected}\n`;
  }
  console.log(message);
}

function testAll() {
  testCase("Already Sorted Array", [1, 2, 3, 4], [1, 2, 3, 4]);
  testCase("Single Element Array", [1], [1]);
  testCase("2 Element Array", [2, 1], [1, 2]);
  testCase("Multi Element Array", [1, 5, 3, 2], [1, 2, 3, 5]);
  testCase("Same Element Array", [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]);
}

testAll();