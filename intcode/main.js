import { runDebugger } from "./debugger/debugger.js";
import { makeComputer, runComputer } from "./src/intcode.js";
const program = Deno.readTextFileSync(
  "./test/data/additionMultiplicationBoss.txt",
).split(",").map((each) => +each);
const computer = makeComputer(program, [[1, 12], [2, 2]]);

runDebugger(computer);
