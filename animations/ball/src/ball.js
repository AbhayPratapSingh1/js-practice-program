const BG_ICON = " ";

const SCREEN_DIMENSTION = {
  width: 20,
  height: 20,
};

const makeNewScreen = () => {
  return Array.from(
    { length: SCREEN_DIMENSTION.height },
    () => Array.from({ length: SCREEN_DIMENSTION.width }, () => BG_ICON),
  );
};

const clearScreen = () => {
  for (let row = 0; row < SCREEN_DIMENSTION.height; row++) {
    for (let col = 0; col < SCREEN_DIMENSTION.width; col++) {
      SCREEN[row][col] = " ";
    }
  }
};

const SCREEN = makeNewScreen();

const showScreen = (screen) => {
  console.clear();
  console.log(`┌${"—".repeat(screen[0].length)}┐`);
  console.log(screen.map((each) => `|${each.join("")}|`).join("\n"));
  console.log(`└${"—".repeat(screen[0].length)}┘`);
};

const randomNoBetween = (st, end) => {
  return st + Math.floor(Math.random() * (end - st));
};

const createBall = (icon) => {
  return {
    icon: icon,
    itrCount: 0,
    speed: randomNoBetween(0, 5),
    cord: {
      x: randomNoBetween(0, SCREEN[0].length),
      y: randomNoBetween(0, SCREEN.length),
    },
    changeFactor: {
      dx: randomNoBetween(0, 6) / 5,
      dy: randomNoBetween(0, 6) / 5,
    },
  };
};

const balls = "0123456789".split("").map((each) => createBall(each));

const drawBall = (screen, { x, y }, icon) => {
  const actualX = Math.floor(x);
  const actualY = Math.floor(y);
  screen[actualY][actualX] = icon;
};

const updateBall = (ball) => {
  if (ball.speed === ball.itrCount) {
    ball.itrCount = 0;
    ball.cord.x += ball.changeFactor.dx;
    ball.cord.y += ball.changeFactor.dy;
    if (ball.cord.x >= SCREEN[0].length || ball.cord.x <= 0) {
      ball.cord.x = ball.cord.x - ball.changeFactor.dx;
      ball.changeFactor.dx = -ball.changeFactor.dx;
    }
    if (ball.cord.y >= SCREEN.length || ball.cord.y <= 0) {
      ball.cord.y = ball.cord.y - ball.changeFactor.dy;
      ball.changeFactor.dy = -ball.changeFactor.dy;
    }
    return;
  }
  ball.itrCount += 1;
};

export const ballAnimation = () => {
  setInterval(() => {
    clearScreen();

    balls.forEach((ball) => {
      drawBall(SCREEN, ball.cord, ball.icon);
      updateBall(ball);
    });

    showScreen(SCREEN);
  }, 40);
};
