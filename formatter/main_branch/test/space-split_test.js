import { assertEquals } from "@std/assert/equals";
import { nonStringComment, splitDataOnSpaces } from "../src/AMT.js";
import { assert } from "@std/assert/assert";

const test_1 = [
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

Deno.test("Space splitting of Data", () => {
  const actual = splitDataOnSpaces(test_1, nonStringComment);
  assert(actual);
});
