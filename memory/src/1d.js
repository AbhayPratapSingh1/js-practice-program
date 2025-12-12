const MAX_MEMORY = 10;
const MEMORY = " ".repeat(MAX_MEMORY).split("");

let offset = -1;

const showMemory = () => {
  console.log(`*|${MEMORY.join("|")}|*`);
};

const input = () => {
  const [mode, processId, ...args] = prompt("Enter len :").split(" ");
  if (!Object.keys(MODES).includes(mode)) {
    input();
  }
  return [processChar, mode, args];
};
export const main = () => {
  let prevMessage = "";
  while (offset < MAX_MEMORY - 1) {
    console.log(prevMessage);
    showMemory();

    const [processId, memoryNeeded] = input();
    const [start, end] = assignMemory(memoryNeeded, processId);
    if (start !== undefined || end !== undefined) {
      prevMessage = `Assined Memory from : ${start} : ${end}`;
    }
  }
  console.log(prevMessage);
};
