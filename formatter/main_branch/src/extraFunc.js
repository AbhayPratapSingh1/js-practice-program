import { dbg } from "./__debugger-helper.js";
import { COMMENTS_PAIR, KNOWN_CHARS, SPACES } from "./__staticData.js";
export const isKnownCharacter = (element) => KNOWN_CHARS.includes(element);
// SPACES;
export const formatCharacter = (element) => {
  const index = SPACES.findIndex((each) => each.values.includes(element));
  return index === -1 ? element : SPACES[index].format(element);
};

const cropLineStart = (line, finalSize) => {
  return line.slice(line.length - finalSize, line.length);
};

// should i merge all of them?
export const sliceString = (line, curIndex) => {
  const stringStartingIcon = line[curIndex];
  let itrIndex = curIndex + 1;

  while (itrIndex < line.length && line[itrIndex] !== stringStartingIcon) {
    itrIndex++;
  }

  const strLine = line.slice(curIndex, itrIndex + 1);
  return { index: itrIndex, slicedString: strLine };
};

export const sliceComment = (line, curIndex) => {
  const endChar = COMMENTS_PAIR[line.slice(curIndex, curIndex + 2)];
  const matSize = endChar.length;

  let itr = curIndex + 2;
  let checkingChar = "";

  while (itr < line.length && checkingChar !== endChar) {
    itr++;
    checkingChar = cropLineStart(line.slice(itr - 1, itr + 1), matSize);
  }

  const strLine = line.slice(curIndex, itr + 1);
  return { index: itr, slicedString: strLine };
};

export const sliceOperator = (line, curIndex) => {
  let itr = curIndex;
  let checkingChar = line[curIndex];

  while (itr < line.length && isKnownCharacter(checkingChar)) {
    itr++;
    checkingChar = line[itr];
  }

  const operator = line.slice(curIndex, itr + 1);
  return { index: itr - 1, slicedOperator: operator };
};
