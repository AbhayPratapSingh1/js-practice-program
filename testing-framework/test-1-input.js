
function mainFunction(input) {
  return input;
}

// update testing function name 
function testCase(type, input, expected) { // update the input param name  
  const actual = mainFunction(input); // update the function name
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : \"${input}\"\n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Description", input, expected);
}

testAllTestCases();
