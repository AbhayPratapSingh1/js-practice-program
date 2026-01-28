import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";
const LENGTH = 5;
const positions = [];

const conversionFormula = {
  "F": "FF+F-[+-F]",
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
    "-": () => turtle.rotate(60, true),
    "+": () => turtle.rotate(60, false),
    "[": () => {
      const pos = { x: turtle.x, y: turtle.y, angle: turtle.angle };
      positions.push(pos);
    },
    "]": () => {
      const val = positions.pop();
      turtle.x = val.x;
      turtle.y = val.y;
      turtle.angle = val.angle;
    },
  };

  for (const code of pattern) {
    action[code](turtle);
    console.log({ a: action[code] });
  }
};

const main = (turtle) => {
  let pattern = [..."FFF"];
  for (let index = 0; index < 2; index++) {
    pattern = moveOneGeneration(pattern);
  }
  console.log(pattern);

  drawPattern(pattern, turtle);
};

const screen = createScreen({ height: 250, width: 250 });
const turtle = new Turtle(screen.width, screen.height, screen, 180);
main(turtle);
// displayScreen(screen);
