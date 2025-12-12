const ADD_SPACE_BOTH_SIDE = [
  "=",
  "-",
  "+",
  "*",
  "%",
  "++",
  "--",
  ">",
  "!",
  "<",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "<=",
  ">=",
  "=>",
  "[]",
  "===",
  "==",

  "!=",
  "!==",
  "))",
  "((",
];
const ADD_SPACE_RIGHT = [
  ",",
  ")",
  "))",
  "return",
  "if",
  "else",
  "while",
  "for",
  ";",
];

const ADD_SPACE_LEFT = ["{"];
const NO_SPACE_CHARACTER = ["(", ")", "}", "."];

const NON_TERMINALING_CHARACTER = ["{", ",", ""];

const knownChar = [
  ADD_SPACE_BOTH_SIDE,
  ADD_SPACE_LEFT,
  ADD_SPACE_RIGHT,
  NO_SPACE_CHARACTER,
];

const DEFAULT_INTEND_GAP = 5;

const addSemicolen = (line) => {
  const trimedLine = line.trim();
  const trimColen = trimedLine.at(-1) === ";"
    ? trimedLine.slice(0, trimedLine.length - 1).trim()
    : trimedLine.trim();
  if (
    NON_TERMINALING_CHARACTER.includes(trimColen.at(-1)) ||
    trimColen.length === 0
  ) {
    return trimColen;
  }
  return trimColen + ";";
};

const addIntend = (line, intend, defaultGap = DEFAULT_INTEND_GAP) => {
  const trimmedLine = line.trim();
  return " ".repeat(defaultGap * intend) + trimmedLine;
};

const isStringStart = (char) => {
  return ['"', "'", "\`"].includes(char);
};

const isOperator = (character) => {
  return isKnownChar(character);
};
const isSameFamily = (current, prev) => {
  return isKnownChar(prev + current);
};

const knownSpaceAdd = (current, prev) => {
  if (ADD_SPACE_BOTH_SIDE.includes(current)) {
    if (ADD_SPACE_BOTH_SIDE.includes(prev)) {
      return current + " ";
    }
    return " " + current + " ";
  }
  if (ADD_SPACE_LEFT.includes(current)) {
    if (ADD_SPACE_BOTH_SIDE.includes(prev)) {
      return current + " ";
    }
    return " " + current;
  }
  if (ADD_SPACE_RIGHT.includes(current)) {
    return current + " ";
  }
  return current;
};

const isKnownChar = (char) => {
  return knownChar.some((each) => each.some((every) => every === char));
};

const join = (elements) => {
  const elementsToJoin = [];

  let prev = "";
  elementsToJoin.push(prev);
  for (let index = 0; index < elements.length; index++) {
    const current = elements[index];
    let modifiedElement = current;

    if (isKnownChar(current)) {
      modifiedElement = knownSpaceAdd(current);
      const prevKnow = isKnownChar(prev);
      if (prevKnow) {
        const prevPush = elementsToJoin.pop().trimEnd();

        modifiedElement = modifiedElement.trimStart();
        const joiner = isSameFamily(current.trim(), prev.trim()) ? "" : " ";

        modifiedElement = [prevPush, modifiedElement.trimStart()].join(joiner);
      }
    } else if (!isKnownChar(current) && !isKnownChar(prev)) {
      modifiedElement = " " + current;
    }
    prev = current;
    elementsToJoin.push(modifiedElement);
  }
  // const joiningElements = elements.map(addSpace);
  return elementsToJoin.join("");
};

const extractString = (line, index) => {
  const seperator = line[index];
  const elements = [seperator];
  let itrIndex = index + 1;
  let current = line[itrIndex];
  while (itrIndex < line.length && current !== seperator) {
    if (current === "\\") {
      elements.push("\\");
      current = line[itrIndex + 1];
      itrIndex++;
    }
    elements.push(current);
    itrIndex++;
    current = line[itrIndex];
  }

  elements.push(seperator);
  return [elements.join(""), itrIndex];
};

const pushAndClear = (collection, characters) => {
  if (characters.length !== 0) {
    collection.push(characters.join(""));
    characters.splice(0, characters.length);
  }
};

const splitExpression = (line) => {
  const lineElements = [];
  let currentElement = [];
  let index = 0;

  while (index < line.length) {
    const current = line[index];

    if (isStringStart(current)) {
      pushAndClear(lineElements, currentElement);
      const strAndIndex = extractString(line, index);
      lineElements.push(strAndIndex[0]);
      index = strAndIndex[1];
    } else {
      if (current === " " && currentElement.length !== 0) {
        lineElements.push(currentElement.join(""));
        currentElement = [];
      } else if (isOperator(current)) {
        pushAndClear(lineElements, currentElement);
        lineElements.push(current);
      } else if (current !== " ") currentElement.push(current);
    }
    index++;
  }

  lineElements.push(currentElement.join(""));

  return lineElements;
};

const getNewIntend = (line, intend) => {
  let newIntend = intend;
  for (const each of line) {
    switch (each) {
      case "}":
        newIntend -= 1;
        break;
      case "};":
        newIntend -= 1;
        break;
      case "{;":
        newIntend += 1;
        break;
      case "{":
        newIntend += 1;
        break;
    }
  }

  return newIntend;
};

const expression = (line, intend) => {
  const splittedLine = splitExpression(line);
  const newIntend = getNewIntend(splittedLine, intend);

  const spaceCorrectedLine = join(splittedLine);
  const finalLine = addSemicolen(spaceCorrectedLine);
  const formatedLine = addIntend(
    finalLine,
    newIntend - intend < 0 ? newIntend : intend,
  );
  return [formatedLine, newIntend];
};
console.log();

const line = [
  "const pushAndClear = ( collection , characters)=>{",
  "  if (characters.length      !==     0) {",
  '    collection.push(characters. join   (""));',
  "    characters.splice(0,    characters.length);",
  "  }",
  "};",
  "",
  "const splitExpression = (line) => {",
  "  const lineElements = [];",
  "  let currentElement = [];",
  "  let index = 0;",
  "",
  "  while (index < line.length) {",
  "    let delta = 1;",
  "    const current = line[index];",
  "",
  "    if (isStringStart(current)) {",
  "      pushAndClear(lineElements, currentElement);",
  "",
  "      const strAndIndex = extractString(line, index);",
  "      lineElements.push(strAndIndex[0]);",
  "",
  "      delta = strAndIndex[1];",
  "    } else {",
  '      if (current === " " && currentElement.length !== 0) {',
  '        lineElements.push(currentElement.join(""));',
  "        currentElement = [];",
  "      } else if (isOperator(current)) {",
  "        pushAndClear(lineElements, currentElement);",
  "        lineElements.push(current);",
  '      } else if (current !== " ") currentElement.push(current);',
  "    }",
  "",
  "    index += delta",
  "  }",
  '  lineElements   .    push   (    currentElement . join( "as    ;   + ++"  ))',
  "",
  "   return     lineElements;",
  "}",
  "",
];

const badlyFormattedTest = [
  "const      inconsistent_spacing = {",
  "    // A comment with an unnecessary trailing space",
  "    key1:   'value 1' , /* This is a multi-line comment that is badly",
  "    formatted and does not align. */",
  "    key2 : 2.5e3,  // Extra space before this comment",
  "  key3: function(a,b=  'default'){",
  "    let result = ( a  +b   ) * 2;",
  "    return result;",
  "  },",
  "};",
  "",
  "// --- Inconsistent Line Breaks and Semicolons ---",
  "",
  "if( inconsistent_spacing.key2 >   1000 )",
  "{",
  "  console.log ('It\\'s a big number' )",
  "} else {",
  "    // No semicolon here!",
  '  const msg = "small number"',
  "    console.log(msg) ;",
  "}",
  "",
  "// --- Operator Spacing and Redundant Parentheses ---",
  "",
  "function calculateSomething(    x,    y    )   {",
  "  let sum =    ( x  +y);",
  "  let difference = (x -    y) ;",
  "",
  "  // Unnecessary complexity and inconsistent indentation",
  "    for (let i = 0 ; i < 10 ; i += 1 ){",
  "        if (i%2===0 )",
  "      {",
  "            // Extra empty line",
  "            sum   += i;",
  "        } else {",
  "          difference   -=  i",
  "        }",
  "    }",
  "",
  "  return (sum    /    difference) ;",
  "}; // Trailing semicolon on function declaration",
  "",
  "// --- Array/Object/Function Calls ---",
  "",
  "const array =   [ 1 ,  'two'  ,    3.0];",
  "",
  "const obj = { one:  1, two:2  , }; // Trailing comma and inconsistent spacing",
  "",
  "array.  forEach((item )  =>  {",
  "  // Function call with weird spacing",
  "  console. log ( item  ,  'end'  ) ;",
  "});",
  "",
  "// --- String and Template Literal Abuse ---",
  'const name =   "John Doe"    ;',
  "const age =  25  ;",
  "",
  "const badString = `",
  "  Hello, ${ name }!",
  "    Your age is ${ (   age  +  5 )  * 2 }",
  "  (This template is poorly indented and spaced).",
  "`;",
  "",
  "// One final, truly horrific line",
  "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;",
  "",
];

const input = badlyFormattedTest.join("\n");
const brokenData = input.split("\n");

const lines = [];
let intend = 1;
for (const line of brokenData) {
  const lineIntend = expression(line, intend);
  intend = lineIntend[1];

  lines.push(lineIntend[0]);
  console.log(lines.at(-1));
}

console.log();
