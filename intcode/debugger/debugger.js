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

const paddedComputerMemory = (program, defaultMin = 10) => {
  const programAsStrings = program.map((each) => each.toString());
  const programInstructionLengths = programAsStrings.map((each) => each.length);
  const padSize = Math.max(defaultMin, ...programInstructionLengths);
  return programAsStrings.map((each) => each.padStart(padSize));
};

const showProgram = (program, toColor = [], minCellWidth = 10) => {
  const paddedProgram = paddedComputerMemory(program, minCellWidth);

  const colorParams = [];

  toColor.forEach(({ index, color, resetColor }) => {
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

const colorInstruction = (index) => ({
  index: index,
  color: "background-color: red; color:rgb(200,200,0)",
  resetColor: "background-color: black; color:white",
});

const colorParam = (index) => ({
  index,
  color: "background-color: rgb(250,250,250); color:black",
  resetColor: "background-color: black; color:white",
});

const colorInstructionAndParam = (computer) => {
  const param = [];

  param.push(colorInstruction(computer.pointer));

  const parameterCount =
    getParameterCount[computer.program[computer.pointer] % 100];

  for (let dx = 1; dx < parameterCount + 1; dx++) {
    const paramObject = colorParam(computer.pointer + dx);
    param.push(paramObject);
  }

  return param;
};

export const runDebugger = (computer) => {
  console.clear();
  const paramsPropertyMarking = colorInstructionAndParam(computer);

  showProgram(computer.program, paramsPropertyMarking);
  console.log("Instruction :", computer.program[computer.pointer]);
  console.log("pointer :", computer.pointer);
  prompt("");

  while (!computer.isHalted) {
    console.clear();
    computer.pointer = executeInstruction(computer);

    const toColor = colorInstructionAndParam(computer);
    showProgram(computer.program, toColor);
    console.log("Instruction :", computer.program[computer.pointer]);
    console.log("pointer :", computer.pointer);
    prompt("");
  }
};
