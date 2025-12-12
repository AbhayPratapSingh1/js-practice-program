const HEIGHT = 8;
const WIDTH = 40;
const DINO = {
  x: WIDTH - 2,
  y: HEIGHT - 2,
  jumpHeight: 5,
  icon: "🦖",
};
const GRAVITY = 1;
const SPEED = 1;

const isJumpInput = (input) => {
  return input === "w";
};

const stdOut = Array.from(
  { length: HEIGHT },
  () => Array.from({ length: WIDTH }),
);

const clearScreen = (stdOut) => {
  for (let r = 0; r < stdOut.length; r++) {
    for (let c = 0; c < stdOut[r].length; c++) {
      stdOut[r][c] = "🟦";
    }
  }
};

const drawGround = (stdOut, ground) => {
  for (let col = 0; col < stdOut.at(-1).length; col++) {
    stdOut[ground.y][col] = "🟫";
  }
};
const isBetween = (current, st, end) => {
  return st < current && current < end;
};

const addDino = (stdOut, dinoCord) => {
  drawInStdOutIfValid(stdOut, dinoCord.x, dinoCord.y, dinoCord.icon);
};

const drawInStdOutIfValid = (stdOut, x, y, icon) => {
  if (
    isBetween(x, -1, stdOut[0].length) &&
    isBetween(y, -1, stdOut.length)
  ) {
    stdOut[y][x] = icon;
  }
};

const drawObstacles = (stdOut, obstacles) => {
  obstacles.foreEach(({ x, y }) => {
  });
};

const drawMap = (stdOut, dinoCord, ground, obstacles) => {
  drawGround(stdOut, ground);
  addDino(stdOut, dinoCord);
  drawObstacles(stdOut, obstacles);
  console.log(stdOut.map((each) => each.join("")).join("\n"));
};
// const drawDino = (stdOut, dinoPos) => {
//   const y = Math.round(dinoPos.y);
//   const x = Math.round(dinoPos.x);
//   stdOut[y][x] = ;
// };
const nearlyEqual = (a, b) => {
  return (a - b) > -0.001 && (a - b) < 0.001;
};

const makeDinoJump = (dinoCord) => {
  if (!nearlyEqual(dinoCord.x, DINO.x) || !nearlyEqual(dinoCord.y, DINO.y)) {
    return;
  }
  dinoCord.yForce = -dinoCord.jumpHeight;
};

const updateDinoPos = (dinoCord, ground) => {
  if (!nearlyEqual(dinoCord.yForce, 0)) {
    const moveDirection = -Math.sign(dinoCord.yForce);
    dinoCord.y -= dinoCord.dy * moveDirection;
    dinoCord.yForce += GRAVITY;
  } else if (dinoCord.y < ground.y - 1) {
    dinoCord.yForce = 0;
    dinoCord.y += GRAVITY;
  }
};

const addObstacles = (obstacles) => {
  const obstacle = { length: 1, width: 1, x: 2, y: HEIGHT - 2 };
  obstacles.push(obstacle);
};

const dinoCord = { ...DINO, xForce: 0, yForce: 0, dx: SPEED, dy: SPEED };
const ground = { y: HEIGHT - 1 };

const obstacles = [];
const playGame = () => {
  let toPlay = true;
  addObstacles(obstacles);
  while (toPlay) {
    console.clear();
    clearScreen(stdOut);

    drawMap(stdOut, dinoCord, ground, obstacles);

    const input = prompt("w for jump :");
    if (isJumpInput(input)) {
      makeDinoJump(dinoCord);
    }
    updateDinoPos(dinoCord, ground);
  }
};

playGame();
