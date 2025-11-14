import { assertEquals } from "@std/assert/equals";
import { AMT } from "../src/AMT.js";
import { assert } from "@std/assert/assert";

const testCase_list_1 = [
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

// const testCase_ans_1 = [
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
//   "' )\n} else {\n    ",
//   "",
//   "// No semicolon here!\n",
//   "  const msg = ",
//   '"small number"',
//   "\n    console.log(msg) ;\n}\n\n",
//   "// --- Operator Spacing and Redundant Parentheses ---\n",
//   "\n" +
//   "function calculateSomething(    x,    y    )   {\n" +
//   "  let sum =    ( x  +y);\n" +
//   "  let difference = (x -    y) ;\n" +
//   "\n" +
//   "  ",
//   "// Unnecessary complexity and inconsistent indentation\n",
//   "    for (let i = 0 ; i < 10 ; i += 1 ){\n" +
//   "        if (i%2===0 )\n" +
//   "      {\n" +
//   "            ",
//   "// Extra empty line\n",
//   "            sum   += i;\n" +
//   "        } else {\n" +
//   "          difference   -=  i\n" +
//   "        }\n" +
//   "    }\n" +
//   "\n" +
//   "  return (sum    /    difference) ;\n" +
//   "}; ",
//   "// Trailing semicolon on function declaration\n",
//   "\n",
//   "// --- Array/Object/Function Calls ---\n",
//   "\nconst array =   [ 1 ,  ",
//   "'two'",
//   "  ,    3.0];\n\nconst obj = { one:  1, two:2  , }; ",
//   "// Trailing comma and inconsistent spacing\n",
//   "\narray.  forEach((item )  =>  {\n  ",
//   "// Function call with weird spacing\n",
//   "  console. log ( item  ,  ",
//   "'end'",
//   "  ) ;\n});\n\n",
//   "// --- String and Template Literal Abuse ---\n",
//   "const name =   ",
//   '"John Doe"',
//   "    ;\nconst age =  25  ;\n\nconst badString = ",
//   "`\n" +
//   "  Hello, ${ name }!\n" +
//   "    Your age is ${ (   age  +  5 )  * 2 }\n" +
//   "  (This template is poorly indented and spaced).\n" +
//   "`",
//   ";\n\n",
//   "// One final, truly horrific line\n",
//   "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;\n",
// ];

Deno.test("Main testing of entire", () => {
  const actual = AMT(testCase_list_1.join("\n"));
  assert(actual);
});
