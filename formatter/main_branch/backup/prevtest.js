import { assertEquals } from "@std/assert";
import {
  formatCharacter,
  isComment,
  sliceComment,
  sliceOperator,
  sliceString,
} from "../src/AMT.js";

Deno.test("character known : both side space ", () => {
  const actual = formatCharacter("*");
  assertEquals(actual, " * ");
});

Deno.test("character known : left side space ", () => {
  const actual = formatCharacter("{");
  assertEquals(actual, " {");
});

Deno.test("character known : right side space ", () => {
  const actual = formatCharacter(",");
  assertEquals(actual, ", ");
});

Deno.test("character known : no side space ", () => {
  const actual = formatCharacter(".");
  assertEquals(actual, ".");
});

Deno.test("character unknown", () => {
  const actual = formatCharacter("data");
  assertEquals(actual, "data");
});

Deno.test('Normal string with the ""', () => {
  const actual = sliceString('d "this is the string"', 2);
  assertEquals(actual, { index: 21, slicedString: '"this is the string"' });
});

Deno.test("Normal string with the ''", () => {
  const actual = sliceString("d 'this is the string'", 2);
  assertEquals(actual, { index: 21, slicedString: "'this is the string'" });
});

Deno.test('Normal string with the "" ', () => {
  const actual = sliceString('d "this is the string"', 2);
  assertEquals(actual, { index: 21, slicedString: '"this is the string"' });
});

Deno.test("Normal string with the ''", () => {
  const actual = sliceString("d 'this is the string'", 2);
  assertEquals(actual, { index: 21, slicedString: "'this is the string'" });
});

Deno.test("Normal string with the ``", () => {
  const actual = sliceString("d `this is the string`", 2);
  assertEquals(actual, { index: 21, slicedString: "`this is the string`" });
});

// Deno.test("string with the `` and `", () => {
//   const actual = sliceString("const a =  `this is \`the string`", 2);
//   assertEquals(actual, { index: 21, slicedString: "`this is the string`" });
// });

Deno.test("Comment //", () => {
  const actual = isComment("//");
  assertEquals(actual, true);
});

Deno.test("Comment /*", () => {
  const actual = isComment("/*");
  assertEquals(actual, true);
});

Deno.test("not Comment */", () => {
  const actual = isComment("*/");
  assertEquals(actual, false);
});

Deno.test("not Comment ", () => {
  const actual = isComment("\n");
  assertEquals(actual, false);
});

Deno.test("Comment ", () => {
  const actual = sliceComment("  // this is the comment\nasdf", 2);
  assertEquals(actual, {
    index: 24,
    slicedString: "// this is the comment\n",
  });
});

Deno.test("Comment", () => {
  const actual = sliceComment("/* this is new Comment */asf", 0);
  assertEquals(actual, {
    index: 24,
    slicedString: "/* this is new Comment */",
  });
});

Deno.test("Comment /*/", () => {
  const actual = sliceComment("/*/ this is new Comment */asf", 0);
  assertEquals(actual, {
    index: 25,
    slicedString: "/*/ this is new Comment */",
  });
});

Deno.test("Comment /**/", () => {
  const actual = sliceComment("/**/ this is new Comment */asf", 0);
  assertEquals(actual, { index: 3, slicedString: "/**/" });
});

Deno.test("Single character Operator", () => {
  const actual = sliceOperator("&", 0);
  assertEquals(actual, { index: 0, slicedOperator: "&" });
});
Deno.test("Single character Operator", () => {
  const actual = sliceOperator(";", 0);
  assertEquals(actual, { index: 0, slicedOperator: ";" });
});

Deno.test("double character Operator", () => {
  const actual = sliceOperator("||", 0);
  assertEquals(actual, { index: 1, slicedOperator: "||" });
});

Deno.test("thiple character Operator", () => {
  const actual = sliceOperator("===", 0);
  assertEquals(actual, { index: 2, slicedOperator: "===" });
});
