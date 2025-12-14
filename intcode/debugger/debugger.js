import { white } from "jsr:@std/internal@^1.0.12/styles";
import { executeInstruction } from "../src/intcode.js";
import { chunk } from "@std/collections";

const addColorToCell = (
  grid,
  coloringIndex,
  colorParamsArray,
  property = "background-color: rgb(0,0,200)",
  antiProperty = "background-color: black",
) => {
  grid[coloringIndex] = "%c" + grid[coloringIndex] + "%c";
  colorParamsArray.push(property);
  colorParamsArray.push(antiProperty);
};

const showProgram = (
  program,
  parameterToColor = [],
  defaulMinWidth = 10,
) => {
  const programAsString = program.map((each) => each.toString());
  const padSize = Math.max(
    ...(programAsString.map((each) => each.length)),
    defaulMinWidth,
  );

  const paddedProgram = programAsString.map((each) => each.padStart(padSize));

  const colorParams = [];
  parameterToColor.forEach(({ index, color, resetColor }) => {
    addColorToCell(paddedProgram, index, colorParams, color, resetColor);
  });

  const chunkParts = chunk(paddedProgram, 8);

  console.log(
    chunkParts.map((each) => each.join("  ")).join("\n"),
    ...colorParams,
  );
};

const getParameterCount = {
  1: 3,
  2: 3,
  99: 0,
};

const colorInstructionAndParam = (computer) => {
  const param = [];
  const instructionColorObject = {
    index: computer.pointer,
    color: "background-color: red; color:black",
    resetColor: "background-color: black; color:white",
  };
  param.push(instructionColorObject);

  const parameterCount =
    getParameterCount[computer.program[computer.pointer] % 100];
  for (let index = 0; index < parameterCount; index++) {
    const paramObject = {
      index: computer.pointer + index + 1,
      color: "background-color: grey; color:black",
      resetColor: "background-color: black; color:white",
    };
    param.push(paramObject);
  }

  return param;
};

const delay = () => {
  for (let index = 0; index < 1000000000; index++) {
  }
};

export const runDebugger = (computer, showMode = false) => {
  console.clear();
  const paramsPropertyMarking = colorInstructionAndParam(computer);
  showProgram(computer.program, paramsPropertyMarking);
  if (showMode) {
    delay();
  } else {
    prompt("");
  }
  while (!computer.isHalted) {
    console.clear();
    computer.pointer = executeInstruction(computer);

    const paramsPropertyMarking = colorInstructionAndParam(computer);
    showProgram(computer.program, paramsPropertyMarking);
    if (showMode) {
      delay();
    } else {
      prompt("");
    }
  }
};
