import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";
const LENGTH = 5;
const ANGLE = 25;
const RESTORE_STACK = [];

const conversionFormula = {
  "F": "FF",
  "X": "F+[[X]-X]-F[-FX]+X",
  "+": "+",
  "-": "-",
  "[": "[",
  "]": "]",
};

const moveOneGeneration = (pattern) => {
  return pattern.flatMap((each) => [...conversionFormula[each]]);
};

const drawPattern = (pattern, turtle) => {
  const action = {
    "F": () => turtle.move(LENGTH),
    "X": () => {},
    "-": () => turtle.rotate(ANGLE, true),
    "+": () => turtle.rotate(ANGLE, false),
    "[": () => {
      const x = turtle.x;
      const y = turtle.y;
      const angle = turtle.angle;
      RESTORE_STACK.push({ x, y, angle });
    },
    "]": () => {
      const rollbackVal = RESTORE_STACK.pop();
      turtle.x = rollbackVal.x;
      turtle.y = rollbackVal.y;
      turtle.angle = rollbackVal.angle;
    },
  };

  for (const code of pattern) {
    action[code](turtle);
  }
};

const main = (turtle) => {
  let pattern = ["-", "X"];
  for (let index = 0; index < 6; index++) {
    pattern = moveOneGeneration(pattern);
  }

  drawPattern(pattern, turtle);
};

const screen = createScreen({ height: 800, width: 800 });
const turtle = new Turtle(10, screen.height - 10, screen, 270, [0, 150, 0]);

main(turtle);

displayScreen(screen);
