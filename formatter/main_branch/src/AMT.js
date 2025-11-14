import { dbg } from "./__debugger-helper.js";
import { COMMENTS_PAIR } from "./__staticData.js";
import { isKnownCharacter, sliceComment, sliceString } from "./extraFunc.js";
import { formatCharacter } from "./extraFunc.js";

export const isStringStart = (line, index) => {
  const element = line[index];
  return ['"', "'", "`"].includes(element);
};

export const isComment = (line, index) => {
  return Object.keys(COMMENTS_PAIR).includes(
    line.slice(index, index + 2),
  );
};

export const splitOperators = (line, index) => {
  let knownCharacter = line[index];
  let itrIndex = index + 1;
  while (
    itrIndex < line.length && isKnownCharacter(knownCharacter + line[itrIndex])
  ) {
    knownCharacter += line[itrIndex];
    itrIndex++;
  }

  return { slicedString: line.slice(index, itrIndex), index: itrIndex - 1 };
};

export const splitListAccordingFunc = (data, predicator, splitter) => {
  return data.flatMap((line) => splitAccordingFunc(line, predicator, splitter));
};

export const splitAccordingFunc = (lines, predicator, splitter) => {
  const splitedData = [];
  let index = 0;
  let currentWord = "";
  while (index < lines.length) {
    const element = lines[index];
    if (predicator(lines, index)) {
      splitedData.push(currentWord);
      currentWord = "";
      const slicedCommet = splitter(lines, index);

      index = slicedCommet.index;
      splitedData.push(slicedCommet.slicedString);
    } else {
      currentWord += element;
    }
    index++;
  }
  splitedData.push(currentWord);
  return splitedData;
};

const removeEmptyString = (data) => {
  return data.filter((each) => each !== "");
};
export const splitDataOnSpaces = (data, predicator) => {
  const cleanData = removeEmptyString(data);
  const splittedData = cleanData.flatMap((each) =>
    predicator(each) ? each.split(" ") : each
  );
  const spaceLess = removeEmptyString(splittedData);
  return spaceLess;
};

export const nonStringComment = (each) =>
  !(isStringStart(each, 0) || isComment(each, 0));

const splitOperatorInList = (data, predicator) => {
  const splittedData = data.flatMap((each) =>
    predicator(each)
      ? splitAccordingFunc(
        each,
        (line, index) => isKnownCharacter(line[index]),
        splitOperators,
      )
      : each
  );
  return removeEmptyString(splittedData);
};

export const addSpaceToData = (current, prev) => {
  if (isKnownCharacter(current)) {
    return formatCharacter(current);
  }
  return current;
};

const join = (data) => {
  const newData = [data[0]];
  for (let index = 1; index < data.length; index++) {
    let spaceAddedData;
    if (isComment(data[index], 0) && data[index].startsWith("/*")) {
      spaceAddedData = data[index] + "\n";
    } else {
      spaceAddedData = addSpaceToData(data[index], newData.at(-1));
    }
    newData.push(spaceAddedData);
  }
  return newData.join("");
};

// const makeLines = (data) => {
//   const newData = [];
//   let index = 0;
//   while (index < data.length) {
//     const current = dbg(data[index], " element");
//     if (isOpeningBlock(current)) {
//       let itr = index;
//       let checkingWord = current;
//       while (BLOCKS[current] !== checkingWord && itr < data.length) {
//         itr++;
//         checkingWord = data[itr];
//       }

//       const newEle = formatBlockRule(data.slice(index, itr + 1));
//       newData.push(dbg(newEle, "new workd"));

//       index = itr;
//     } else {
//       newData.push(current);
//     }
//     index++;
//   }
//   return newData;
// };

export const AMT = (code) => {
  const commentsSplitedData = splitAccordingFunc(code, isComment, sliceComment);
  const stringSplitData = splitListAccordingFunc(
    commentsSplitedData,
    isStringStart,
    sliceString,
  );

  const splitOnSpace = splitDataOnSpaces(
    stringSplitData,
    nonStringComment,
  );

  const totalBrokenData = splitOperatorInList(splitOnSpace, nonStringComment);
  const joined = join(totalBrokenData.filter((each) => each !== "\n"));

  return joined;
  // const makedLines = makeLines(totalBrokenData);
  // return makedLines.filter((each) => each !== "\n").flatMap((each) => each)
  //   .join(" ");
  // return totalBrokenData.filter((each) => each !== "\n").join(" ");
  // const joinedData = join(totalBrokenData);
  // return joinedData;
};

const testCase_list_1 = [
  "const      inconsistent_spacing = {",
  "    // A comment with an unnecessary trailing space",
  "    key1:   'valu       e 1' , /* This is a multi-line comment that is badly",
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

console.log(AMT(testCase_list_1.join("\n")));
// console.log(
//   AMT(
//     [
//       "// Extra space before this comment\n",
//       "key3:",
//       "function(a,b=",
//       "'default'",
//       "){\n",
//       "let",
//       "result",
//       "=",
//       "(",
//       "a",
//       "+b)",
//       "",
//     ].join("\n"),
//   ),
// );
