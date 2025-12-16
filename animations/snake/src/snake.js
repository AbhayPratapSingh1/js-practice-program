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

const createScreen = (height, linesCount) => ({
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: linesCount }, () => " "),
  ),
  height,
  width: linesCount,
});

const isOut = (bar, prev, screen) => {
  let checkingY = prev.y;
  let checkingX = prev.x;
  if (prev.y <= 0) {
    checkingX -= 1;
    checkingY = screen.height;
  }
  return (bar.y + bar.length === checkingY) && (bar.x === checkingX);
};

const moveSnake = (screen, snake) => {
  const movements = {
    N: (snake) => {
      if (snake.y === 0) {
        snake.y = screen.height;
      }
      snake.y -= 1;
    },
    S: (snake) => {
      if (snake.y === screen.height) {
        snake.y = -1;
      }
      snake.y += 1;
    },
    W: (snake) => {
      if (snake.x === 0) {
        snake.x = screen.width;
      }
      snake.x -= 1;
    },
    E: (snake) => {
      if (snake.x === screen.width) {
        snake.x = -1;
      }
      snake.x += 1;
    },
  };

  movements[snake.direction](snake);

  // normalisePosition(screen, snake);
};

const moveTail = (snake) => {
  const direction = ["E", "W"].includes(snake.direction) ? "—" : "|";
  snake.locations.push({ x: snake.x, y: snake.y, icon: direction });
};

const AXIS_DIRECTION = {
  x: ["E", "W"],
  y: ["N", "S"],
};

const snakeNewDirection = (snake, fruit = { x: 5, y: 5 }) => {
  const dfx = fruit.x - snake.x;
  const dsx = snake.x - fruit.x;
  const dfy = fruit.y - snake.y;
  const dsy = snake.y - fruit.y;
  console.log(dfx, dfy);

  if (dfx === 0) {
    if (AXIS_DIRECTION.y.includes(snake.direction)) {
      return;
    } else {
      snake.direction = dfy > dsy ? "S" : "N";
    }
  } else if (dfy === 0) {
    if (AXIS_DIRECTION.x.includes(snake.direction)) {
      return;
    } else {
      snake.direction = dfx > dsx ? "E" : "W";
    }
  } else if (dfx > dfy) {
    if (AXIS_DIRECTION.x.includes(snake.direction)) {
      return;
    } else {
      snake.direction = dfx > dsx ? "E" : "W";
    }
  } else {
    if (AXIS_DIRECTION.y.includes(snake.direction)) {
      return;
    } else {
      snake.direction = dfy > dsy ? "S" : "N";
    }
  }
};

const updateSnake = (screen, snake, fruit) => {
  snakeNewDirection(snake, fruit);
  moveTail(snake);
  moveSnake(screen, snake);
};

const randomNoBetween = (start = 0, end = 1) => {
  return Math.floor((Math.random() * (end - start)) + start);
};

const generateFruit = (screen, snake, icon = "F") => {
  const lastSnakeTailPos = snake.direction.slice(
    snake.direction.length - snake.length,
  );

  const allUsedPos = [{ x: snake.x, y: snake.y }, ...lastSnakeTailPos];

  let fruitx = randomNoBetween(0, screen.width);

  while (allUsedPos.every((each) => each.x === fruitx)) {
    fruitx = randomNoBetween(0, screen.width);
  }
  let fruity = randomNoBetween(0, screen.height);
  while (allUsedPos.every((each) => each.x === fruity)) {
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
