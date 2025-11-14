// const testCases = [{
//   description: "character known : both side space ",
//   input: ["*"],
//   fn: "formatCharacter",
//   expected: ` * `,
// }, {
//   description: "character known : left side space ",
//   input: ["{"],
//   fn: "formatCharacter",
//   expected: ` {`,
// }, {
//   description: "character known : right side space ",
//   input: [","],
//   fn: "formatCharacter",
//   expected: `, `,
// }, {
//   description: "character known : no side space ",
//   input: ["."],
//   fn: "formatCharacter",
//   expected: `.`,
// }, {
//   description: "character unknown",
//   input: ["data"],
//   fn: "formatCharacter",
//   expected: `data`,
// }, {
//   description: 'Normal string with the ""',
//   input: [`d "this is the string"`, 2],
//   fn: "cutString",
//   expected: { index: 21, cuttedString: `"this is the string"` },
// }, {
//   description: "Normal string with the ''",
//   input: [`d 'this is the string'`, 2],
//   fn: "cutString",
//   expected: { index: 21, cuttedString: `'this is the string'` },
// }, {
//   description: "Normal string with the ``",
//   input: ["d `this is the string`", 2],
//   fn: "cutString",
//   expected: { index: 21, cuttedString: "`this is the string`" },
// }, {
//   description: "string with the `` and \`",
//   input: ["d `this is \`the string`", 2],
//   fn: "cutString",
//   expected: { index: 21, cuttedString: "`this is the 'string`" },
// }, {
//   description: "Comment //",
//   input: [`//`],
//   fn: "isComment",
//   expected: true,
// }, {
//   description: "Comment /*",
//   input: [`/*`],
//   fn: "isComment",
//   expected: true,
// }, {
//   description: "not Comment */",
//   input: [`*/`],
//   fn: "isComment",
//   expected: false,
// }, {
//   description: "not Comment \\n",
//   input: [`\n`],
//   fn: "isComment",
//   expected: false,
// }, {
//   description: "Comment //",
//   input: [`  // this is the comment\nasdf`, 2],
//   fn: "cutComment",
//   expected: { index: 24, cuttedString: "// this is the comment\n" },
// }, {
//   description: "Comment /*",
//   input: [`/* this is new Comment */asf`, 0],
//   fn: "cutComment",
//   expected: { index: 24, cuttedString: "/* this is new Comment */" },
// }, {
//   description: "Comment /*/",
//   input: [`/*/ this is new Comment */asf`, 0],
//   fn: "cutComment",
//   expected: { index: 25, cuttedString: "/*/ this is new Comment */" },
// }, {
//   description: "Comment /**/",
//   input: [`/**/ this is new Comment */asf`, 0],
//   fn: "cutComment",
//   expected: { index: 3, cuttedString: "/**/" },
// }];
