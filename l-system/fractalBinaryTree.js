import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";
const LENGTH = 5;

const conversionFormula = {
  "1": "11",
  "0": "1[0]0",
  "[": "[",
  "]": "]",
};

const screen = createScreen({ height: 800, width: 800 });
const turtle = new Turtle(screen.width / 2, screen.height, screen, 270);

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const drawPattern = (pattern, turtle) => {
  let sidefactor = 1;
  const rollBacks = [];

  const action = {
    "1": () => turtle.move(sidefactor * LENGTH),
    "0": () => turtle.move(sidefactor * LENGTH * 0.8),
    "[": () => {
      rollBacks.push({ x: turtle.x, y: turtle.y, angle: turtle.angle });
      turtle.rotate(45, false);
      sidefactor = sidefactor - 0.05;
    },
    "]": () => {
      const rollBackVal = rollBacks.pop();

      turtle.x = rollBackVal.x;
      turtle.y = rollBackVal.y;
      turtle.angle = rollBackVal.angle;

      turtle.rotate(45, true);

      sidefactor = sidefactor + 0.05;
    },
  };

  for (const code of pattern) {
    action[code](turtle, sidefactor, rollBacks);
  }
};

const main = (turtle) => {
  let pattern = ["0"];
  for (let index = 0; index < 7; index++) {
    console.log(pattern.join(""));

    pattern = moveOneGeneration(pattern);
  }

  drawPattern(pattern, turtle);
};

main(turtle);
displayScreen(screen);
