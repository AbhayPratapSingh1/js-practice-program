
function mainFunction(entity1, entity2) {
  return entity1 + entity2;
}

const R = 253;
const G = 182;
const B = 0;
// for text
const RGBCOLOR = "\u001b[38;2;" + R + ";" + G + ";" + B + "m";
// console.log("color L: ", RGBCOLOR);

// text
const TXT_BLUE = 34;
const TXT_GREEN = 32;
const TXT_RED = 31;
// BG
const BG_GREEN = 42;
const BG_CYAN = 46;

const LAVENDER = "\u001b[38;5;147m";
const PINK = "\u001b[38;5;201m";


// const BG_COLOR = BG_CYAN;
// const TEXT_COLOR = TXT_RED;

const TXT_COLOR = LAVENDER;
// const TEXT_COLOR = TXT_RED;

const BOLD = "\u001b[1m"
const ITALIC = "\u001b[3m"
const UNDERLINE = "\u001b[4m"

// const resultBGPrefix = "\u001b[" + BG_COLOR + "m";
const COLOR_BG_TEXT = "\u001b[" + TXT_COLOR + BOLD + ITALIC;


const resetPrefix = "\u001b[0m";

const sideGap = 3;

let readOnly = true;

let maxLenEntity1 = 0;
let maxLenEntity2 = 0;

let maxLenExpected = 0;
let maxLenEntityActual = 0;



function max(entity, prevMax) {
  return entity.length > prevMax ? entity.length : prevMax;
}

function findMaxLen(entity1, entity2, expected, actual) {

  maxLenEntity1 = max("" * entity1, maxLenEntity1) + sideGap;
  maxLenEntity2 = max("" * entity2, maxLenEntity2) + sideGap;

  maxLenExpected = max("" * expected, maxLenExpected) + sideGap;
  maxLenEntityActual = max("" * actual, maxLenEntityActual) + sideGap;
}

function testMainFunction(entity1, entity2, expected) {
  const actual = mainFunction(entity1, entity2);
  if (readOnly) {
    findMaxLen(entity1, entity2, expected, actual);
  } else {
    const message = setRow(entity1, entity2, expected, actual)
    console.log(message);

  }
}


function addSpaces(value, width) {
  const word = value + ""
  const left = width - word.length;
  const addExtra = left % 2 === 1;
  const leftRightSpace = left / 2;

  let spaceToAdd = "";

  for (let count = 1; count <= leftRightSpace; count++) {
    spaceToAdd += " ";
  }
  return spaceToAdd + word + spaceToAdd + (addExtra ? " " : "")
}

function setRow(entity1, entity2, expected, actual) {
  let message = "";


  let result = actual === expected ? "✅" : "❌";
  if (actual === "Actual" && expected === "Expected") {
    result = "  ";
  }


  message += "|" + result + "|";

  message += addSpaces(entity1, maxLenEntity1) + "|";
  message += addSpaces(entity2, maxLenEntity2) + "|";

  message += COLOR_BG_TEXT + addSpaces(actual, maxLenEntityActual) + "|";
  message += addSpaces(expected, maxLenExpected) + resetPrefix + "|";

  return message;
}

function getMaxVerticalWidth() {
  let width = 0;
  width += 4; // for "|" + resultIcon(2) + "|"

  width += maxLenEntity1 + 1; // 1 for "|";
  width += maxLenEntity2 + 1;

  width += maxLenEntityActual + 1;
  width += maxLenExpected + 1;

  return width;
}

function getVerticalLine(size) {
  let line = "";
  for (let count = 0; count < size; count++) {
    line += "-";
  }
  return line
}

function setHeading(entity1, entity2) {
  if (readOnly) {
    findMaxLen(entity1, entity2, "Expected", "Actual")
  } else {

    const maxWidth = getMaxVerticalWidth();
    let header = "";

    const verticalLine = getVerticalLine(maxWidth);
    header += verticalLine + "\n";

    header += setRow(entity1, entity2, "Expected", "Actual") + "\n";

    header += verticalLine;
    console.log(header);

  }
}

function testCases() {

  console.log();

  setHeading("Word", "Meaning");

  testMainFunction(1000, 1000, 2000);
  testMainFunction(2000, 100, 2100);
  testMainFunction(1000, 4000, 5000);
  testMainFunction(1000, 1300, 2300);
  testMainFunction(2000, 2000, 4000);
  testMainFunction(1000, 1300, 2000);
  testMainFunction(1000, 1300, 2200);


  const maxWidth = getMaxVerticalWidth()
  const verticalLine = getVerticalLine(maxWidth);
  if (!readOnly) {
    console.log(verticalLine);
  }
  readOnly = false;
}

testCases();
testCases();
console.log();
