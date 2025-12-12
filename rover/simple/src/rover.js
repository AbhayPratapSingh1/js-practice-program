import { delay } from "./visualiser/utility.js";

const moveRover = function () {
  const possibleActions = {
    "⬆️": () => --this.y,
    "➡️": () => ++this.x,
    "⬅️": () => --this.x,
    "⬇️": () => ++this.y,
  };

  possibleActions[this.orientation]();
};

const DIRECTIONS = ["⬅️", "⬆️", "➡️", "⬇️"];

const directionCycler = function (current) {
  let i = DIRECTIONS.indexOf(current);

  return (rotation) => {
    const isAntiClockwise = rotation === "L";

    const incrementInI = isAntiClockwise ? 3 : 1;
    i = (i + incrementInI) % DIRECTIONS.length;

    return DIRECTIONS[i];
  };
};

export const createRover = (roverPosition) => {
  const updateOrientation = directionCycler(
    roverPosition.orientation,
  );

  const rotateRover = (direction) =>
    roverPosition.orientation = updateOrientation(direction);

  const actions = {
    "M": moveRover.bind(roverPosition),
    "L": rotateRover.bind(roverPosition, "L"),
    "R": rotateRover.bind(roverPosition, "R"),
  };

  const roverFormatedData = () => {
    return roverPosition;
  };

  return [actions, roverFormatedData];
};

const parseCordinates = (position) => {
  const [x, y, orientation] = position.split(" ");
  return { x: parseInt(x), y: parseInt(y), orientation };
};

export const executeInstructions = (position, instructions) => {
  const roverPosition = parseCordinates(position);
  const [actions, currentRoverLocation] = createRover(roverPosition);

  [...instructions].forEach((command) => {
    actions[command]();
    delay();
  });

  return currentRoverLocation();
};
