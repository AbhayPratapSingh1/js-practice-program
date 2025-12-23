const showScreen = (screen) => {
  console.clear();
  console.log("┌" + "—".repeat(screen.width) + "┐");
  console.log(
    screen.pixels.map((each) => "|" + each.join("") + "|").join("\n"),
  );
  console.log("└" + "—".repeat(screen.width) + "┘");
};

const isBetween = (value, start, end) => {
  return start < value && value < end;
};

const fillScreenPixel = (screen, x, y, icon) => {
  if (isBetween(x, -1, screen.width) && isBetween(y, -1, screen.height)) {
    screen.pixels[y][x] = icon;
  }
};

const clearScreen = (screen) => {
  for (let row = 0; row < screen.height; row++) {
    for (let col = 0; col < screen.width; col++) {
      screen.pixels[row][col] = " ";
    }
  }
};

const addTailToScreen = (screen, snake) => {
  const start = Math.min(snake.length, snake.locations.length);

  for (let index = start; index > 0; index--) {
    const tail = snake.locations.at(-index);
    fillScreenPixel(screen, tail.x, tail.y, tail.icon);
  }
};

const updateScreen = (screen, snake, fruit) => {
  clearScreen(screen);
  fillScreenPixel(screen, snake.x, snake.y, snake.icon);
  fillScreenPixel(screen, fruit.x, fruit.y, fruit.icon);
  addTailToScreen(screen, snake);
};

const createScreen = (height, width) => ({
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: width }, () => " "),
  ),
  height,
  width,
});
const moveSnake = (screen, snake) => {
  if (snake.x === screen.width && snake.dx === 1) {
    snake.x = 0;
  } else if (snake.x === 0 && snake.dx === -1) {
    snake.x = screen.width;
  }
  if (snake.y === screen.height && snake.dy === 1) {
    snake.y = 0;
  } else if (snake.y === 0 && snake.dy === -1) {
    snake.y = screen.height;
  }

  snake.x += snake.dx;
  snake.y += snake.dy;
};

const moveTail = (snake) => {
  const icon = ".";
  snake.locations.push({ x: snake.x, y: snake.y, icon });
};

const snakeNewDirection = (snake, fruit = { x: 5, y: 5 }) => {
  const dfx = fruit.x - snake.x;
  const dsx = snake.x - fruit.x;
  const dfy = fruit.y - snake.y;
  const dsy = snake.y - fruit.y;

  console.log(dfx, dfy);

  if (dfx === 0) {
    if (snake.dy !== 1 && snake.dy !== -1) {
      snake.dx = 0;
      snake.dy = dfy > dsy ? 1 : -1;
    }
  } else if (dfy === 0) {
    if (snake.dx !== 1 && snake.dx !== -1) {
      snake.dx = dfx > dsx ? 1 : -1;
      snake.dy = 0;
    }
  } else if (dfx > dfy) {
    if (snake.dx !== 1 && snake.dx !== -1) {
      snake.dx = dfx > dsx ? 1 : -1;
      snake.dy = 0;
    }
  } else {
    if (snake.dy !== 1 && snake.dy !== -1) {
      snake.dx = 0;
      snake.dy = dfy > dsy ? 1 : -1;
    }
  }
};

const updateSnake = (screen, snake, fruit) => {
  snakeNewDirection(snake, fruit);
  moveTail(snake);
  moveSnake(screen, snake);
};

const randomNoBetween = (min = 0, max = 1) => {
  return Math.floor((Math.random() * (max - min)) + min);
};

const generateFruit = (screen, snake, icon = "F") => {
  const lastSnakeTailPos = snake.direction.slice(
    snake.direction.length - snake.length,
  );

  const allUsedPos = [{ x: snake.x, y: snake.y }, ...lastSnakeTailPos];

  let fruitx = randomNoBetween(0, screen.width);

  while (allUsedPos.some((each) => each.x === fruitx)) {
    fruitx = randomNoBetween(0, screen.width);
  }

  let fruity = randomNoBetween(0, screen.height);
  while (allUsedPos.some((each) => each.y === fruity)) {
    fruity = randomNoBetween(0, screen.height);
  }
  return { x: fruitx, y: fruity, icon };
};

const isSamPos = (object1, object2) => {
  return (object1.x === object2.x && object1.y === object2.y);
};

export const snakeAnimation = (
  snakeObj,
  height = 20,
  width = 20,
  duration = 50,
) => {
  const screen = createScreen(height, width);
  const speed = 200;
  const frameChangeTimes = (duration * 1000) / speed;

  setTimeout(() => {
    let roundCount = 0;
    let fruit = generateFruit(screen, snakeObj, "F");

    const runningAnimation = setInterval(() => {
      console.log(snakeObj);
      if (roundCount++ === frameChangeTimes) {
        clearInterval(runningAnimation);
      }

      if (isSamPos(fruit, snakeObj)) {
        snakeObj.length += 1;
        fruit = generateFruit(screen, snakeObj, "F");
      }

      updateSnake(screen, snakeObj, fruit);
      updateScreen(screen, snakeObj, fruit);
      showScreen(screen);
    }, speed);
  }, 0);
};
