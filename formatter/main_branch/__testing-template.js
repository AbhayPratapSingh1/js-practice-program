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
  if (typeof value1 === null && typeof value2 === null) {
    return true;
  }
  if (typeof value1 === "object" && typeof value2 === "object") {
    const object2Keys = Object.keys(value2);
    for (const key of Object.keys(value1)) {
      if (!object2Keys.includes(key)) {
        return false;
      }
      if (!isDeepEqual(value1[key], value2[key])) {
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
  if (value === null) {
    return null + "";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
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
    const prinatableExpected = genPrintableInput(testDetail.expected);
    const prinatableInput = genPrintableInput(testDetail.input);
    message += `\t   | Input    : ${prinatableInput}\n\t   ` +
      `| Actual   : ${prinatableActual}\n\t   ` +
      `| Expected : ${prinatableExpected}\n`;
  }
  console.log(message);
}
