// const ADD_SPACE_BOTH_SIDE = [
//   "=",
//   "-",
//   "+",
//   "*",
//   "%",
//   "++",
//   "--",
//   ">",
//   "!",
//   "<",
//   "+=",
//   "-=",
//   "*=",
//   "/=",
//   "%=",
//   "<=",
//   ">=",
//   "=>",
//   "[]",
//   "===",
//   "==",

//   "!=",
//   "!==",
//   "))",
//   "((",
// ];
// const ADD_SPACE_RIGHT = [
//   ",",
//   ")",
//   "))",
//   "return",
//   "if",
//   "else",
//   "while",
//   "for",
//   ";",
// ];
// const ADD_SPACE_LEFT = ["{"];
// const NO_SPACE_CHARACTER = ["(", ")", "}", "."];
// const NON_TERMINALING_CHARACTER = ["{", ",", ""];

const dbg = (x) => {
  console.log(x);
  prompt("");
  return x;
};

const SPACES = [
  {
    // both
    format: (characters) => ` ${characters} `,
    values: [
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
    ],
  },
  {
    // left
    format: (characters) => ` ${characters}`,
    values: ["{"],
  },
  {
    // right
    format: (characters) => `${characters} `,
    values: [
      ",",
      ")",
      "))",
      "return",
      "if",
      "else",
      "while",
      "for",
      ";",
    ],
  },
  {
    // no
    format: (characters) => characters,
    values: ["(", ")", "}", "."],
  },
];

// it is a copy of known space as it will keep happen for each characters
const KNOWN_CHARS = SPACES.map((each) => [...each.values]).flat();
// console.log(KNOWN_CHARS);

const isKnownCharacter = (element) => KNOWN_CHARS.includes(element);

export const formatCharacter = (element) => {
  const index = SPACES.findIndex((each) => each.values.includes(element));

  return index === -1 ? element : SPACES[index].format(element);
};

// const formatCode = (data) => {
// };

// const testCase = [
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

// console.log(formatCode(testCase));
