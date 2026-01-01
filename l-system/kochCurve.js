import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";
const LENGTH = 5;

const conversionFormula = {
  "F": "F+F-F-F+F",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) => {
  return pattern.flatMap((each) => [...conversionFormula[each]]);
};

const drawPattern = (pattern, turtle) => {
  const action = {
    "F": () => turtle.move(LENGTH),
    "-": () => turtle.rotate(90, true),
    "+": () => turtle.rotate(90, false),
  };

  for (const code of pattern) {
    action[code](turtle);
  }
};

const main = (turtle) => {
  let pattern = ["F"];
  for (let index = 0; index < 4; index++) {
    pattern = moveOneGeneration(pattern);
  }

  drawPattern(pattern, turtle);
};

const screen = createScreen({ height: 250, width: 450 });
const turtle = new Turtle(0, screen.height - 10, screen, 0);
main(turtle);
displayScreen(screen);
//
