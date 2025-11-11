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

export const SPACES = [
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
export const KNOWN_CHARS = SPACES.map((each) => [...each.values]).flat();
