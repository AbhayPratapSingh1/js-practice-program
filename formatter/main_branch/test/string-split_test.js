import { assertEquals } from "@std/assert/equals";
import {
  AMT,
  isStringStart,
  splitAccordingFunc,
  splitListAccordingFunc,
} from "../src/AMT.js";
import { COMMENTS_PAIR } from "../src/__staticData.js";
import { sliceString } from "../src/extraFunc.js";
const test_1 = [
  "const      inconsistent_spacing = {\n    ",
  "// A comment with an unnecessary trailing space\n",
  "    key1:   'value 1' , ",
  "/* This is a multi-line comment that is badly\n" +
  "    formatted and does not align. */",
  "\n    key2 : 2.5e3,  ",
  "// Extra space before this comment\n",
  "  key3: function(a,b=  'default'){\n" +
  "    let result = ( a  +b   ) * 2;\n" +
  "    return result;\n" +
  "  },\n" +
  "};\n" +
  "\n",
  "// --- Inconsistent Line Breaks and Semicolons ---\n",
  "\n" +
  "if( inconsistent_spacing.key2 >   1000 )\n" +
  "{\n" +
  "  console.log ('It\\'s a big number' )\n" +
  "} else {\n" +
  "    ",
  "// No semicolon here!\n",
  '  const msg = "small number"\n    console.log(msg) ;\n}\n\n',
  "// --- Operator Spacing and Redundant Parentheses ---\n",
  "\n" +
  "function calculateSomething(    x,    y    )   {\n" +
  "  let sum =    ( x  +y);\n" +
  "  let difference = (x -    y) ;\n" +
  "\n" +
  "  ",
  "// Unnecessary complexity and inconsistent indentation\n",
  "    for (let i = 0 ; i < 10 ; i += 1 ){\n" +
  "        if (i%2===0 )\n" +
  "      {\n" +
  "            ",
  "// Extra empty line\n",
  "            sum   += i;\n" +
  "        } else {\n" +
  "          difference   -=  i\n" +
  "        }\n" +
  "    }\n" +
  "\n" +
  "  return (sum    /    difference) ;\n" +
  "}; ",
  "// Trailing semicolon on function declaration\n",
  "\n",
  "// --- Array/Object/Function Calls ---\n",
  "\n" +
  "const array =   [ 1 ,  'two'  ,    3.0];\n" +
  "\n" +
  "const obj = { one:  1, two:2  , }; ",
  "// Trailing comma and inconsistent spacing\n",
  "\narray.  forEach((item )  =>  {\n  ",
  "// Function call with weird spacing\n",
  "  console. log ( item  ,  'end'  ) ;\n});\n\n",
  "// --- String and Template Literal Abuse ---\n",
  'const name =   "John Doe"    ;\n' +
  "const age =  25  ;\n" +
  "\n" +
  "const badString = `\n" +
  "  Hello, ${ name }!\n" +
  "    Your age is ${ (   age  +  5 )  * 2 }\n" +
  "  (This template is poorly indented and spaced).\n" +
  "`;\n" +
  "\n",
  "// One final, truly horrific line\n",
  "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;\n",
];

const test_1_out = [
  "const      inconsistent_spacing = {\n    ",
  "// A comment with an unnecessary trailing space\n",
  "    key1:   ",
  "'value 1'",
  " , ",
  "/* This is a multi-line comment that is badly\n" +
  "    formatted and does not align. */",
  "\n    key2 : 2.5e3,  ",
  "// Extra space before this comment\n",
  "  key3: function(a,b=  ",
  "'default'",
  "){\n    let result = ( a  +b   ) * 2;\n    return result;\n  },\n};\n\n",
  "// --- Inconsistent Line Breaks and Semicolons ---\n",
  "\nif( inconsistent_spacing.key2 >   1000 )\n{\n  console.log (",
  "'It\\'",
  "s a big number",
  "' )\n} else {\n    ",
  "",
  "// No semicolon here!\n",
  "  const msg = ",
  '"small number"',
  "\n    console.log(msg) ;\n}\n\n",
  "// --- Operator Spacing and Redundant Parentheses ---\n",
  "\n" +
  "function calculateSomething(    x,    y    )   {\n" +
  "  let sum =    ( x  +y);\n" +
  "  let difference = (x -    y) ;\n" +
  "\n" +
  "  ",
  "// Unnecessary complexity and inconsistent indentation\n",
  "    for (let i = 0 ; i < 10 ; i += 1 ){\n" +
  "        if (i%2===0 )\n" +
  "      {\n" +
  "            ",
  "// Extra empty line\n",
  "            sum   += i;\n" +
  "        } else {\n" +
  "          difference   -=  i\n" +
  "        }\n" +
  "    }\n" +
  "\n" +
  "  return (sum    /    difference) ;\n" +
  "}; ",
  "// Trailing semicolon on function declaration\n",
  "\n",
  "// --- Array/Object/Function Calls ---\n",
  "\nconst array =   [ 1 ,  ",
  "'two'",
  "  ,    3.0];\n\nconst obj = { one:  1, two:2  , }; ",
  "// Trailing comma and inconsistent spacing\n",
  "\narray.  forEach((item )  =>  {\n  ",
  "// Function call with weird spacing\n",
  "  console. log ( item  ,  ",
  "'end'",
  "  ) ;\n});\n\n",
  "// --- String and Template Literal Abuse ---\n",
  "const name =   ",
  '"John Doe"',
  "    ;\nconst age =  25  ;\n\nconst badString = ",
  "`\n" +
  "  Hello, ${ name }!\n" +
  "    Your age is ${ (   age  +  5 )  * 2 }\n" +
  "  (This template is poorly indented and spaced).\n" +
  "`",
  ";\n\n",
  "// One final, truly horrific line\n",
  "let finalResult=   (    calculateSomething(   array[0],    obj.one   )   + 10  ) ;\n",
];
Deno.test("basic testing Case ", () => {
  const response = splitListAccordingFunc(test_1, isStringStart, sliceString);
  assertEquals(response, test_1_out);
});
