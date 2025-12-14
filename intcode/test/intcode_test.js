import { assertEquals } from "@std/assert";
import { makeComputer, runComputer } from "../src/intcode.js";
import { readFileData } from "./helper.js";

Deno.test("Simple addition", () => {
  const computer = makeComputer([1, 0, 0, 0, 99]);
  runComputer(computer);
  assertEquals(computer.program, [2, 0, 0, 0, 99]);
});

Deno.test("Simple Multiplication", () => {
  const computer = makeComputer([2, 3, 0, 3, 99]);
  runComputer(computer);
  assertEquals(computer.program, [2, 3, 0, 6, 99]);
});

Deno.test("square of number", () => {
  const computer = makeComputer([2, 4, 4, 5, 99, 0]);
  runComputer(computer);
  assertEquals(computer.program, [2, 4, 4, 5, 99, 9801]);
});
Deno.test("both Multiplication, and addition", () => {
  const computer = makeComputer([1, 1, 1, 4, 99, 5, 6, 0, 99]);
  runComputer(computer);
  assertEquals(computer.program, [30, 1, 1, 4, 2, 5, 6, 0, 99]);
});

Deno.test("Addition multiplication boss", () => {
  const inputProgram = readFileData("additionMultiplicationBoss.txt").split(",")
    .map((each) => +each);

  const computer = makeComputer(inputProgram, [[1, 12], [2, 2]]);

  runComputer(computer);

  assertEquals(computer.program[0], 2890696);
});
