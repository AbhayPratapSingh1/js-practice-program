import { formatCharacter } from "./AMT.js";
import { testCase } from "./testing-template.js";

const test_isknownCharacter = () => {
  console.log("\tTesting : isKnownCharacter\n");

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
console.log();

test_isknownCharacter();
