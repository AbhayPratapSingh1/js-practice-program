const DIRECTION = [..."ESWN"];

const turnLeftBy = (current, turnBy = 1) => {
  const currentIndex = DIRECTION.indexOf(current);
  return DIRECTION[(currentIndex + turnBy) % 4];
};

const turnRight = (current) => {
  return turnLeftBy(current, 3);
};

const turnLeft = (current) => {
  return turnLeftBy(current, 1);
};

const createRover = (positions) => {
  const roverPositions = { ...positions };
  roverPositions.actions = {
    "L": () =>
      roverPositions.orientation = turnLeft(roverPositions.orientation),
    "R": () =>
      roverPositions.orientation = turnRight(roverPositions.orientation),
  };
  return roverPositions;
};

const main = () => {
};

main();
