const showScreen = (grid) => {
  console.log(grid.map((each) => each.join("")).join("\n"));
};

const addNewBar = () => {
  const length = 2;
  return { x: 1 - length, y: 0, length, icon: "🟩", isHalted: false };
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
      screen.pixels[row][col] = ". ";
    }
  }
};

const updateScreen = (screen, bars) => {
  clearScreen(screen);
  bars.forEach(({ x, y, icon, length }) => {
    for (let index = 0; index < length; index++) {
      fillScreenPixel(screen, x, y + index, icon);
    }
  });
};

const createScreen = (height, linesCount) => ({
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: linesCount }, () => " ."),
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

const updateIfBarReached = (bars, screen) => {
  let prev = { x: screen.width - 1, y: screen.height };
  for (const bar of bars) {
    if (!bar.isHalted && isOut(bar, prev, screen)) {
      bar.isHalted = true;
    }
    prev = bar;
  }
};

const updateBars = (bars, screen) => {
  const barsToUpdate = bars.filter((each) => !(each.isHalted));

  for (const bar of barsToUpdate) {
    if (bar.y < screen.height) {
      bar.y += 1;
    } else {
      bar.x += 1;
      bar.y = 1 - bar.length;
    }
  }
  updateIfBarReached(bars, screen);
};

const isScreenFilledByBar = (bars, screen) => {
  if (bars.length === 0) {
    return false;
  }
  const totalPossibleBarsInCol = Math.ceil(screen.height / bars[0].length);

  const totalPossibleBars = totalPossibleBarsInCol * screen.width;

  return totalPossibleBars + 1 === bars.length;
};

export const fallingBar = (height = 10, linesCount = 5, duration = 10) => {
  const speed = 40;
  const times = duration / speed;
  const displayScreen = createScreen(height, linesCount);
  setTimeout(() => {
    let roundCount = 0;
    const bars = [addNewBar()];
    const runningAnimation = setInterval(() => {

      console.clear();

      if (bars.every((each) => each.isHalted)) {
        bars.push(addNewBar());
      }
      updateScreen(displayScreen, bars);
      showScreen(displayScreen.pixels);
      if (isScreenFilledByBar(bars, displayScreen)) {
        bars.length = 0;
      }
      updateBars(bars, displayScreen);
      if (roundCount++ === times) {
        clearInterval(runningAnimation);
      }
    }, speed);
  }, 0);
};
