import { placeRover } from "./placeRover.js";
import { createRover } from "./rover.js";
import { delay } from "./visualiser/utility.js";

const isValidCommand = "".includes.bind("MLR");

export function runRover() {
  let runAnimation = true;

  const [x, y] = prompt("Enter x y space seperated:")
    .split(" ");
  const orientation = "⬆️";
  const [actions, getRoverPosition] = createRover({
    x: +x,
    y: +y,
    orientation,
  });

  while (runAnimation) {
    const input = prompt("Enter the Next Cords");
    [...input].forEach((command) => {
      if (isValidCommand(command)) {
        actions[command]();
        placeRover(getRoverPosition());
        delay(10);
      }
    });
    runAnimation = input !== "q";
  }
}
