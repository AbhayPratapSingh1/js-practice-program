import {
  AMT,
  cutComment,
  cutString,
  formatCharacter,
  isComment,
} from "../backup/test-case.js";
import { testCase } from "../backup/test-case.js";

const underline = (text, gap = 0) => {
  const leftMargin = "\t".repeat(gap);
  const underlineText = "-".repeat(text.length);
  return `${leftMargin}${text}\n${leftMargin}${underlineText}`;
};

const test_isknownCharacter = () => {
  console.log();
  console.log(`${underline("Testing : isKnownCharacter", 1)}\n`);

  const testCases = [{
    description: "character known : both side space ",
    input: ["*"],
    fn: formatCharacter,
    expected: ` * `,
  }, {
    description: "character known : left side space ",
    input: ["{"],
    fn: formatCharacter,
    expected: ` {`,
  }, {
    description: "character known : right side space ",
    input: [","],
    fn: formatCharacter,
    expected: `, `,
  }, {
    description: "character known : no side space ",
    input: ["."],
    fn: formatCharacter,
    expected: `.`,
  }, {
    description: "character unknown",
    input: ["data"],
    fn: formatCharacter,
    expected: `data`,
  }];
  testCases.map((each) => testCase(each));
};

const test_cutString = () => {
  console.log();
  const description = "Testing the cut the string from given index";
  console.log(`${underline(description, 1)}\n`);

  const testCases = [
    {
      description: 'Normal string with the ""',
      input: [`d "this is the string"`, 2],
      fn: cutString,
      expected: { index: 21, cuttedString: `"this is the string"` },
    },
    {
      description: "Normal string with the ''",
      input: [`d 'this is the string'`, 2],
      fn: cutString,
      expected: { index: 21, cuttedString: `'this is the string'` },
    },
    {
      description: "Normal string with the ``",
      input: ["d `this is the string`", 2],
      fn: cutString,
      expected: { index: 21, cuttedString: "`this is the string`" },
    },
    {
      description: "string with the `` and \`",
      input: ["d `this is \`the string`", 2],
      fn: cutString,
      expected: { index: 21, cuttedString: "`this is the 'string`" },
    },
  ];
  testCases.map((each) => testCase(each));
};

const test_isComment = () => {
  console.log();
  const description = "Testing is comment";
  console.log(`${underline(description, 1)}\n`);

  const testCases = [
    {
      description: "Comment //",
      input: [`//`],
      fn: isComment,
      expected: true,
    },
    {
      description: "Comment /*",
      input: [`/*`],
      fn: isComment,
      expected: true,
    },
    {
      description: "not Comment */",
      input: [`*/`],
      fn: isComment,
      expected: false,
    },
    {
      description: "not Comment \\n",
      input: [`\n`],
      fn: isComment,
      expected: false,
    },
  ];
  testCases.map((each) => testCase(each));
};
const test_cutComment = () => {
  console.log();
  const description = "Testing cutComment";
  console.log(`${underline(description, 1)}\n`);

  const testCases = [
    {
      description: "Comment //",
      input: [`  // this is the comment\nasdf`, 2],
      fn: cutComment,
      expected: { index: 24, cuttedString: "// this is the comment\n" },
    },
    {
      description: "Comment /*",
      input: [`/* this is new Comment */asf`, 0],
      fn: cutComment,
      expected: { index: 24, cuttedString: "/* this is new Comment */" },
    },
    {
      description: "Comment /*/",
      input: [`/*/ this is new Comment */asf`, 0],
      fn: cutComment,
      expected: { index: 25, cuttedString: "/*/ this is new Comment */" },
    },
    {
      description: "Comment /**/",
      input: [`/**/ this is new Comment */asf`, 0],
      fn: cutComment,
      expected: { index: 3, cuttedString: "/**/" },
    },
  ];
  testCases.map((each) => testCase(each));
};

console.log();

test_isknownCharacter();
test_cutString();
test_isComment();
test_cutComment();

const finalBossInput = [
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

const finalBoss = {
  description: "Final Boss Not able to generate result now",
  input: finalBossInput.join("\n"),
  fn: AMT,
  expected: "",
};

// const testCase_2 =
//   `const testCase = " heloo wthsai sadigh asadF 'asfdasd asdgf asfs  aasfd'";
// export const AMT = (code) => {
//   const response = splitIdetifiable(testCase);
//   console.log(response);
// };
// `;
// const testCase_2_out = [
//   "const testCase = ",
//   `" heloo wthsai sadigh asadF 'asfdasd asdgf asfs  aasfd'"`,
//   ";\nexport const AMT = (code) => {\n  const response = splitIdetifiable(testCase);\n  console.log(response);\n};\n",
// ];

// // Deno.test("basic testing Case ", () => {
// //   const response = AMT(testCase_2);
// //   assertEquals(response, testCase_2_out);
// // });

// const finalBossInput = [
//   "const      inconsistent_spacing = {",
//   "    // A comment with an unnecessary trailing space",
//   "    key1:   'value 1' , /* This is a multi-line comment that is badly",
//   "    formatted and does not align. */",
//   "    key2 : 2.5e3,  // Extra space before this comment",
//   "  key3: function(a,b=  'default'){",
//   "    let result = ( a  +b   ) * 2;",
//   "    return result;",
//   "  },",
//   "};",
//   "",
//   "// --- Inconsistent Line Breaks and Semicolons ---",
//   "",
//   "if( inconsistent_spacing.key2 >   1000 )",
//   "{",
//   "  console.log ('It\\'s a big number' )",
//   "} else {",
//   "    // No semicolon here!",
//   '  const msg = "small number"',
//   "    console.log(msg) ;",
//   "}",
//   "",
//   "// --- Operator Spacing and Redundant Parentheses ---",
//   "",
//   "function calculateSomething(    x,    y    )   {",
//   "  let sum =    ( x  +y);",
//   "  let difference = (x -    y) ;",
//   "",
//   "  // Unnecessary complexity and inconsistent indentation",
//   "    for (let i = 0 ; i < 10 ; i += 1 ){",
//   "        if (i%2===0 )",
//   "      {",
//   "            // Extra empty line",
//   "            sum   += i;",
//   "        } else {",
//   "          difference   -=  i",
//   "        }",
//   "    }",
//   "",
//   "  return (sum    /    difference) ;",
//   "}; // Trailing semicolon on function declaration",
//   "",
//   "// --- Array/Object/Function Calls ---",
//   "",
//   "const array =   [ 1 ,  'two'  ,    3.0];",
//   "",
//   "const obj = { one:  1, two:2  , }; // Trailing comma and inconsistent spacing",
//   "",
//   "array.  forEach((item )  =>  {",
//   "  // Function call with weird spacing",
//   "  console. log ( item  ,  'end'  ) ;",
//   "});",
//   "",
//   "// --- String and Template Literal Abuse ---",
//   'const name =   "John Doe"    ;',
//   "const age =  25  ;",
//   "",
//   "const badString = `",
//   "  Hello, ${ name }!",
//   "    Your age is ${ (   age  +  5 )  * 2 }",
//   "  (This template is poorly indented and spaced).",
//   "`;",
//   "",
//   "// One final, truly horrific line",
//   "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;",
//   "",
// ];

// const finalBossExpected = [
//   "const      inconsistent_spacing = {\n    ",
//   "// A comment with an unnecessary trailing space\n",
//   "    key1:   ",
//   "'value 1'",
//   " , ",
//   "/* This is a multi-line comment that is badly\n" +
//   "    formatted and does not align. */",
//   "\n    key2 : 2.5e3,  ",
//   "// Extra space before this comment\n",
//   "  key3: function(a,b=  ",
//   "'default'",
//   "){\n    let result = ( a  +b   ) * 2;\n    return result;\n  },\n};\n\n",
//   "// --- Inconsistent Line Breaks and Semicolons ---\n",
//   "\nif( inconsistent_spacing.key2 >   1000 )\n{\n  console.log (",
//   "'It\\'",
//   "s a big number",
//   "' )\n" +
//   "} else {\n" +
//   "    // No semicolon here!\n" +
//   '  const msg = "small number"\n' +
//   "    console.log(msg) ;\n" +
//   "}\n" +
//   "\n" +
//   "// --- Operator Spacing and Redundant Parentheses ---\n" +
//   "\n" +
//   "function calculateSomething(    x,    y    )   {\n" +
//   "  let sum =    ( x  +y);\n" +
//   "  let difference = (x -    y) ;\n" +
//   "\n" +
//   "  // Unnecessary complexity and inconsistent indentation\n" +
//   "    for (let i = 0 ; i < 10 ; i += 1 ){\n" +
//   "        if (i%2===0 )\n" +
//   "      {\n" +
//   "            // Extra empty line\n" +
//   "            sum   += i;\n" +
//   "        } else {\n" +
//   "          difference   -=  i\n" +
//   "        }\n" +
//   "    }\n" +
//   "\n" +
//   "  return (sum    /    difference) ;\n" +
//   "}; // Trailing semicolon on function declaration\n" +
//   "\n" +
//   "// --- Array/Object/Function Calls ---\n" +
//   "\n" +
//   "const array =   [ 1 ,  '",
//   "two",
//   "'  ,    3.0];\n" +
//   "\n" +
//   "const obj = { one:  1, two:2  , }; // Trailing comma and inconsistent spacing\n" +
//   "\n" +
//   "array.  forEach((item )  =>  {\n" +
//   "  // Function call with weird spacing\n" +
//   "  console. log ( item  ,  '",
//   "end",
//   "'  ) ;\n" +
//   "});\n" +
//   "\n" +
//   "// --- String and Template Literal Abuse ---\n" +
//   'const name =   "John Doe"    ;\n' +
//   "const age =  25  ;\n" +
//   "\n" +
//   "const badString = `\n" +
//   "  Hello, ${ name }!\n" +
//   "    Your age is ${ (   age  +  5 )  * 2 }\n" +
//   "  (This template is poorly indented and spaced).\n" +
//   "`;\n" +
//   "\n" +
//   "// One final, truly horrific line\n" +
//   "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;\n",
//   "",
// ];

// const finalBoss = finalBossInput.join("\n");
// // testCase(finalBoss);

// // const testCaseMain = Deno.test("final boss ", () => {
// //   const response = AMT(finalBoss);
// //   assertEquals(response, finalBossExpected);
// // });
