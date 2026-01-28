import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";
const LENGTH = 5;

const conversionFormula = {
  "F": "F-G+F+G-F",
  "G": "GG",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) => {
  return pattern.flatMap((each) => [...conversionFormula[each]]);
};

const drawPattern = (pattern, turtle) => {
  const action = {
    "F": () => turtle.move(LENGTH),
    "G": () => turtle.move(LENGTH),
    "-": () => turtle.rotate(120, true),
    "+": () => turtle.rotate(120, false),
  };

  for (const code of pattern) {
    action[code](turtle);
  }
};

const main = (turtle) => {
  let pattern = ["F", "-", "G", "-", "G"];
  for (let index = 0; index < 6; index++) {
    pattern = moveOneGeneration(pattern);
  }

  drawPattern(pattern, turtle);
};

const screen = createScreen({ height: 250, width: 250 });
const turtle = new Turtle(screen.width, screen.height, screen, 180);
main(turtle);
displayScreen(screen);
