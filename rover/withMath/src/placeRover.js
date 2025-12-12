const GRID_X = 11;
const GRID_Y = 11;

const locationMap = " ".repeat(GRID_Y).split("").map((each) =>
  "  ".repeat(GRID_X).split("")
);
const offSet = { x: Math.floor(GRID_X / 2), y: Math.floor(GRID_Y / 2) };

export const placeRover = (roverPosition) => {
  const placingX = offSet.x + roverPosition.x;
  const placingY = offSet.y + roverPosition.y;

  const newGrid = locationMap.map((each) => each.map((every) => every));

  newGrid[placingY][placingX] = roverPosition.orientation;
  console.clear();
  console.log(newGrid.map((each) => each.join("")).join("\n"));
};
