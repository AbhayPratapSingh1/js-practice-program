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
  const printableBuffer = [];
  for (let index = 0; index < array.length; index++) {
    const printablElement = genPrintableInput(array[index]);
    printableBuffer.push(printablElement);
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

export function testCase(testDetail) {
  const actual = testDetail.fn(...testDetail.input);
  const isEqual = isDeepEqual(actual, testDetail.expected);
  const icon = isEqual ? "✅" : "❌";
  let message = `\t${icon} ${testDetail.description}\n`;
  if (!isEqual) {
    const prinatableActual = genPrintableInput(actual);
    const prinatableExpected = genPrintableInput(expected);
    const prinatableInput = genPrintableInput(input);
    message += `\t   | Input    : ${prinatableInput}\n\t   ` +
      `| Actual   : ${prinatableActual}\n\t   ` +
      `| Expected : ${prinatableExpected}\n`;
  }
  console.log(message);
}
