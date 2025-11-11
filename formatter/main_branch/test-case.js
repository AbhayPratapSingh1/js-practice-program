import { AMT, cutString, formatCharacter } from "./AMT.js";
import { testCase } from "./__testing-template.js";

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
      expected: { index: 22, cuttedString: `"this is the string"` },
    },
    {
      description: "Normal string with the ''",
      input: [`d 'this is the string'`, 2],
      fn: cutString,
      expected: { index: 22, cuttedString: `'this is the string'` },
    },
    {
      description: "Normal string with the ``",
      input: ["d `this is the string`", 2],
      fn: cutString,
      expected: { index: 22, cuttedString: "`this is the string`" },
    },
    {
      description: "string with the `` and \`",
      input: ["d `this is \`the string`", 2],
      fn: cutString,
      expected: { index: 22, cuttedString: "`this is the 'string`" },
    },
  ];
  testCases.map((each) => testCase(each));
};
console.log();

test_isknownCharacter();
test_cutString();

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
// testCase(finalBoss);
