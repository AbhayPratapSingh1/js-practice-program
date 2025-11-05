function mainFunction(input, input2, input3) {
  return "expected";
}

function testCase(type, input, input2, input3, expected) {
  const actual = mainFunction(input, input2, input3);
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : `;
  message += isPass ? "" : `\"${input}\", `;
  message += isPass ? "" : `\"${input2}\", `;
  message += isPass ? "" : `\"${input3}\"\n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Description", "input1", "input2", "input3", "expected");
  testCase("Description", "input1", "input2", "input3", "exected");
}

testAllTestCases();
