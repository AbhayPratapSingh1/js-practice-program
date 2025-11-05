function mainFunction(input, input2) {
  return "expected";
}
// update testing function name 
function testCase(type, input, input2, expected) { // update the input param name 
  const actual = mainFunction(input, input2); // update the function name
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : \"${input}\",\"${input2}\" \n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Description", "input1", "input2", "expected");
}

testAllTestCases();
