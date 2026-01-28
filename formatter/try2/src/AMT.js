import { isKnownCharacter } from "./extraFunc.js";

const removeExtraSpace = (line) => {
  const singleLine = [];
  let prev = "";
  for (let charIdx = 0; charIdx < line.length; charIdx++) {
    const char = line[charIdx];
    if (!(prev === " " && char === " ")) {
      singleLine.push(char);
    }
    prev = char;
  }
  return singleLine.join("");
};

export const formatter = (data) => {
  console.log(data);

  const finalData = [];
  const word = [];

  for (let index = 0; index < data.length; index++) {
    const char = data[index];

    if (char !== " ") {
      word.push(char);
    } else {
      if (isKnownCharacter(word.join(""))) {
        console.log("parseFormated Word");
        console.log(word.join("\n"));
      }
      finalData.push(word.join(""), " ");
      word.length = 0;
    }
  }
  console.log(finalData);
};
