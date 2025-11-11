import { dbg } from "./__debugger-helper.js";
import { KNOWN_CHARS, SPACES } from "./__staticData.js";

export const isKnownCharacter = (element) => KNOWN_CHARS.includes(element);

export const formatCharacter = (element) => {
  const index = SPACES.findIndex((each) => each.values.includes(element));
  return index === -1 ? element : SPACES[index].format(element);
};

// THIS CONTAIN THE STRING STARTING CHARACTER TO!
export const cutString = (line, curIndex) => {
  const stringStartingIcon = line[curIndex];
  let itrIndex = curIndex + 1;
  while (itrIndex < line.length && line[itrIndex] !== stringStartingIcon) {
    itrIndex++;
  }

  return {
    index: itrIndex + 1,
    cuttedString: line.slice(curIndex, itrIndex + 1),
  };
};

export const AMT = (code) => {
  return code;
};
