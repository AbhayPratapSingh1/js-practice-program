const HEIGHT = 8;
const WIDTH = 40;
const DINO_BLUE_PRINT = {
  x: WIDTH - 2,
  y: HEIGHT - 2,
  jumpHeight: 3,
  icon: "🦖",
};

const GRAVITY = 1;
const SPEED = 1;
const GROUND = { y: HEIGHT - 1, icon: "🟫" };
const STDOUT = { HEIGHT: 8, WIDTH: 40, bg: "🟦" };
STDOUT.screen = Array.from(
  { length: HEIGHT },
  () => Array.from({ length: WIDTH }),
);

const OBSTACLES = {
  objects: [],
  frequency: 10,
  frequencyRandomRange: [-4, 5],
  curCount: 10,
  randomChanger: 200,
};

const randomNoBetween = (st, end) =>
  Math.floor(Math.random() * (end - st)) + st;

const nearlyEqual = (a, b) => {
  return (a - b) > -0.001 && (a - b) < 0.001;
};

const isBetween = (current, st, end) => {
  return st < current && current < end;
};

const drawIfValid = (stdOut, x, y, icon) => {
  if (
    isBetween(x, -1, stdOut.WIDTH) &&
    isBetween(y, -1, stdOut.HEIGHT)
  ) {
    stdOut.screen[y][x] = icon;
  }
};

const clearScreen = (stdOut) => {
  for (let r = 0; r < stdOut.HEIGHT; r++) {
    for (let c = 0; c < stdOut.WIDTH; c++) {
      stdOut.screen[r][c] = stdOut.bg;
    }
  }
};

const isJumpInput = (input) => {
  return input === "w";
};

const drawGround = (stdOut, ground) => {
  for (let col = 0; col < stdOut.WIDTH; col++) {
    drawIfValid(stdOut, col, ground.y, ground.icon);
  }
};

const addDino = (stdOut, dinoCord) => {
  drawIfValid(stdOut, dinoCord.x, dinoCord.y, dinoCord.icon);
};

const drawObstacles = (stdOut, obstacles) => {
  obstacles.objects.forEach(({ x, y }) => {
    drawIfValid(stdOut, x, y, "XX");
  });
};

const drawStdOut = (screen) => {
  console.log(screen.map((each) => each.join("")).join("\n"));
};

const drawMap = (stdOut, dinoCord, ground, obstacles) => {
  drawGround(stdOut, ground);
  addDino(stdOut, dinoCord);
  drawObstacles(stdOut, obstacles);

  drawStdOut(stdOut.screen);
};

const makeDinoJump = (dinoCord) => {
  if (
    !nearlyEqual(dinoCord.x, DINO_BLUE_PRINT.x) ||
    !nearlyEqual(dinoCord.y, DINO_BLUE_PRINT.y)
  ) {
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
  if (
    obstacles.curCount >=
      obstacles.frequency + randomNoBetween(...obstacles.frequencyRandomRange)
  ) {
    obstacles.curCount = 0;
    obstacles.objects.push({ length: 1, width: 1, x: 2, y: HEIGHT - 2 });
  }
  obstacles.curCount++;
};

const updateObstacles = (obstacles) => {
  for (let index = 0; index < obstacles.objects.length; index++) {
    const obstacle = obstacles.objects[index];
    obstacle.x += 1;
  }
};

const isGameOver = (obstacles, dino) => {
  for (let index = 0; index < obstacles.objects.length; index++) {
    const object = obstacles.objects[index];

    if (dino.x === object.x && dino.y === object.y) {
      return true;
    }
  }
  return false;
};

const dinoCord = {
  ...DINO_BLUE_PRINT,
  xForce: 0,
  yForce: 0,
  dx: SPEED,
  dy: SPEED,
};

export const playGame = () => {
  let score = 0;
  let randomIncreaseTime = 0;
  while (!isGameOver(OBSTACLES, dinoCord)) {
    score++;
    console.clear();
    addObstacles(OBSTACLES);
    clearScreen(STDOUT);
    console.log("Current Score :", score);
    drawMap(STDOUT, dinoCord, GROUND, OBSTACLES);
    const input = prompt("w for jump :");
    if (isJumpInput(input)) {
      makeDinoJump(dinoCord);
    }
    updateDinoPos(dinoCord, GROUND);
    updateObstacles(OBSTACLES);
    if (randomIncreaseTime++ === OBSTACLES.randomChanger) {
      randomIncreaseTime = 0;
      OBSTACLES.frequencyRandomRange[0] -= 1;
    }
  }

  console.log("GAME OVER");
  console.log("Final Score :", score);
};
