export const SPACES = [
  {
    // both
    format: (characters) => ` ${characters} `,
    values: [
      "=",
      "&",
      "&&",
      "||",
      "|",
      "-",
      ":",
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
      "{",
    ],
  },
  {
    // left
    format: (characters) => ` ${characters}`,
    values: [],
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
      "function",
      "const",
      "let",
    ],
  },
  {
    // no
    format: (characters) => characters,
    values: ["(", ")", "}", ".", "\n", "))", "(("],
  },
];

// it is a copy of known space as it will keep happen for each characters
export const KNOWN_CHARS = SPACES.map((each) => [...each.values]).flat();

// export const COMMENTS_PAIR = [["//", "\n"], ["/*", "*/"]];

export const COMMENTS_PAIR = {
  "//": "\n",
  "/*": "*/",
};
