function replaceChar(string, char, newChar, index) {
  const returningChar = string[index] === char ? newChar : string[index];
  return index < string.length - 1 ?
    returningChar + replaceChar(string, char, newChar, index + 1) :
    returningChar;
}

function stringReplacement(string, char, newChar) {
  return string.length === 0 ? "" : replaceChar(string, char, newChar, 0);
}

function testCase(type, string, char, newChar, expected) {
  const actual = stringReplacement(string, char, newChar);
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : `;
  message += isPass ? "" : `\"${string}\", \"${char}\", \"${newChar}\" \n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Empty string", "", "l", "h", "");
  testCase("Empty character", "hello", "", "h", "hello");
  testCase("Empty replacing character", "hello", "l", "", "heo");
  testCase("single character with single", "hello", "l", "h", "hehho");
  testCase("Single character with multiple one", "hello", "l", "hh", "hehhhho");
}

testAllTestCases();
