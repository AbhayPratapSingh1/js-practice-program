const randomNo = (start, end) => {
  const no = Math.floor(Math.random() * (end - start + 1)) + start;
  return no;
};

const GARBAGE_CHARACTER = [
  "{",
  "}",
  " ",
  " ",
  " ",
  " ",
  "[",
  "]",
  ";",
  "'",
  ":",
  ",",
  ".",
  "<",
  ">",
  "/",
  "/",
  ".",
  ",",
  "!",
  "@",
  "$",
  "#",
  "%",
  "^",
  "$",
  "&",
  "*",
  "*",
  "(",
  ")",
  ")",
  "+",
  "~",
  "A",
  "B",
  "C",
  "A",
  "J",
  "G",
  "E",
  "Y",
  "O",
  "O",
  "F",
  "M",
  "X",
  "L",
  "l",
  "s",
  "f",
  "c",
  "n",
  "e",
  "u",
  "w",
  "p",
  "c",
  "m",
  "a",
  "h",
  "g",
  "x",
  "k",
  "l",
  "a",
  "f",
  "w",
  "q",
  "`",
  "~",
];

const generateGarbageLine = (length) => {
  return " ".repeat(length).split("").map((each) =>
    GARBAGE_CHARACTER.at(randomNo(0, GARBAGE_CHARACTER.length))
  ).join("");
};

const randomAfter = (after, offset = 10) => {
  const start = after;
  const end = offset - 2 + after;
  return randomNo(start, end) + 2;
};

const shuffleArray = (array) => array.toSorted(() => (Math.random() * 2) - 1);

const cypherData = (data) => {
  const cypheringData = [];
  let count = 1;
  let taken = 0;
  while (taken < data.length) {
    const cuttingPartEnd = randomAfter(taken);
    const mainMessage = ` ${count},${data.slice(taken, cuttingPartEnd)}_`;
    const garbage = generateGarbageLine(cuttingPartEnd);

    cypheringData.push(garbage);
    cypheringData.push(mainMessage);

    taken = cuttingPartEnd;
    count++;
  }

  const shuffleData = shuffleArray(cypheringData);
  console.log(shuffleData);
  return shuffleData.join("");
};

const readData = (filePath) => {
  if (filePath === "") {
    console.log("Invalid Path");

    return "";
  }
  const data = Deno.readTextFileSync(filePath);
  return data;
};

const main = () => {
  const data = readData("./sampleText.txt");
  const cypheredData = cypherData(data);
  console.log(cypheredData);
};
main();
