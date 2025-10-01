function sliceString(string, index, end) {
  if (index >= string.length) {
    return "";
  }
  const char = string[index];
  return index < end ? char + sliceString(string, index + 1, end) : char;
}

function isStringAt(string, substring, offset, index) {
  const isSame = string[offset + index] === substring[index];
  if (index < substring.length - 1 && isSame) {
    return isStringAt(string, substring, offset, index + 1);
  }
  return isSame;
}

function replaceChars(str, chars, newChars, index) {
  const isMorePossible = str.length - chars.length > index;

  if (isStringAt(str, chars, index, 0)) {
    const newIndex = index + chars.length;
    const otherPart = isMorePossible ?
      replaceChars(str, chars, newChars, newIndex) :
      sliceString(str, newIndex, str.length);
    return newChars + otherPart;
  }

  return isMorePossible ?
    str[index] + replaceChars(str, chars, newChars, index + 1) :
    sliceString(str, index, str.length);
}

function stringReplacement(string, chars, newChars) {
  const strLen = string.length;
  const charLen = chars.length;
  const isSameReturn = strLen < charLen || strLen === 0 || charLen === 0;
  return isSameReturn ? string : replaceChars(string, chars, newChars, 0);
}


// update testing function name 
function testCase(type, string, chars, newChars, expected) {
  const actual = stringReplacement(string, chars, newChars);
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : `;
  message += isPass ? "" : `\"${string}\", \"${chars}\", \"${newChars}\" \n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Empty string", "", "h", "a", "");
  testCase("Single Character", "a", "h", "a", "a");
  testCase("Empty substring", "a", "", "b", "a");
  testCase("substring is larger than string", "ab", "abc", "v", "ab");
  testCase("replacing to \"\"", "abcabcabcabc", "c", "", "abababab");
  testCase("Single replace to single character", "hello", "l", "h", "hehho");
  testCase("Single replace to 2 character", "hello", "l", "hh", "hehhhho");
  testCase("Double replace to 1 character", "hello", "ll", "h", "heho");
  testCase("Double replace to 2 character", "hello", "ll", "hh", "hehho");

  testCase("replace 3 characters with 1", "abcdedabcdefabcdef", "abc", "_", "_ded_def_def");

  testCase("Replace \"the\" with \"a\"", "I want the apple and the orange", "the", "a", "I want a apple and a orange");

}

testAllTestCases();
