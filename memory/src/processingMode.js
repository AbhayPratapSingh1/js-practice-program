export const MODES = {
  "a": assignMemory,
  "r": releaseMemory,
};

const releaseMemory = (processId) => {
};

const isBetween = (st, end, index) => {
  return st <= index && index <= end;
};
const assignMemory = (processId, ...args) => {
  const needSize = args[0];
  if ((+needSize) + "" === "NaN") {
    console.log("Invalid Value");
    return;
  }
  if (offset + needSize > MAX_MEMORY - 1) {
    return [];
  }
  const memoryFrom = offset + 1;
  offset += needSize;
  for (const index in MEMORY) {
    if (isBetween(memoryFrom, offset, index)) {
      if (MEMORY[index] !== " ") {
        console.log("INVALID MEMORY ALLIOCATION");
        return;
      }
      MEMORY[index] = processId;
    }
  }
  return [memoryFrom, offset];
};
