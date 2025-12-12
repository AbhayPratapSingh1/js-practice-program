const BG_ICON = " ";

const SCREEN = {
  width: 40,
  height: 20,
  pixels: [],
};

const makeNewScreen = () => {
  return Array.from(
    { length: SCREEN.height },
    () => Array.from({ length: SCREEN.width }, () => BG_ICON),
  );
};
SCREEN.pixels = makeNewScreen();

const clearScreen = () => {
  SCREEN.pixels = makeNewScreen();
};

const showScreen = (screen) => {
  console.clear();
  console.log("┌" + "—".repeat(screen[0].length) + "┐");
  console.log(screen.map((each) => "|" + each.join("") + "|").join("\n"));
  console.log("└" + "—".repeat(screen[0].length) + "┘");
};

const randomNoBetween = (st, end) => {
  return st + Math.floor(Math.random() * (end - st));
};

const drawCharAt = (screen, char, x, y) => {
  if (x < 0 || screen.width <= x) {
    return;
  }
  if (y < 0 || screen.height <= y) {
    return;
  }
  screen.pixels[y][x] = char;
};

const DIRECTION = ["Horizonatal", "Vertical"];

const createNewObject = (text) => ({
  text,
  currentCount: 0,
  updateIn: randomNoBetween(1, 15),
  type: DIRECTION[randomNoBetween(0, 2)],
  dc: (randomNoBetween(0, 2) * 2) - 1,
  cord: {
    x: randomNoBetween(0, SCREEN.pixels[0].length),
    y: randomNoBetween(0, SCREEN.pixels.length),
  },
});

const strings = [
  ..."method in JavaScript, when used with arrays, does not modify the original array(s). Instead, it returns a new array containing the combined elements of the original array and any arrays or values passed as arguments."
    .split(" "),
];

const objects = strings.map((each) => createNewObject(each));

const updateCordHorizontal = ({ x, y }, length, dc) => {
  let newX = x + dc;
  if (newX === SCREEN.pixels[0].length) {
    newX = -length;
  } else if (newX === -length) {
    newX = SCREEN.pixels[0].length - 1;
  }
  return { x: newX, y };
};

const updateCordVertical = ({ x, y }, length, dc) => {
  let newY = y + dc;
  if (newY === SCREEN.pixels.length) {
    newY = -length;
  } else if (newY === -length) {
    newY = SCREEN.pixels.length - 1;
  }
  return { x, y: newY };
};

const placeSingleStringHorizontal = (text, { x, y }) => {
  for (let index = 0; index < text.length; index++) {
    if (SCREEN.pixels[y].length > x + index) {
      drawCharAt(SCREEN, text[index], x + index, y);
    }
  }
};

const placeSingleStringVertical = (text, { x, y }) => {
  for (let index = 0; index < text.length; index++) {
    if (y + index > -1 && y + index < SCREEN.pixels.length) {
      drawCharAt(SCREEN, text[index], x, index + y);
    }
  }
};

const placeString = () => {
  objects.map((each) => {
    if (each.currentCount === 0) {
      each.cord = updateFuncs[each.type](each.cord, each.text.length, each.dc);
    }

    each.currentCount = (each.currentCount + 1) % each.updateIn;
    placeStringFunc[each.type](each.text, each.cord);
  });
};

const updateFuncs = {
  "Horizonatal": updateCordHorizontal,
  "Vertical": updateCordVertical,
};

const placeStringFunc = {
  "Horizonatal": placeSingleStringHorizontal,
  "Vertical": placeSingleStringVertical,
};

const frameNoice = (screen, noiceIcon = "-") => {
  const noicesCount = randomNoBetween(1, 10);
  for (let _ = 0; _ < noicesCount; _++) {
    const x = randomNoBetween(0, screen[0].length);
    const y = randomNoBetween(0, screen.length);

    screen[y][x] = screen[y][x] === BG_ICON ? noiceIcon : screen[y][x];
  }
};

const shiftOneRowUp = (screen, col) => {
  const firstRow = screen[0][col];
  for (let index = 1; index < screen.length; index++) {
    screen[index - 1][col] = screen[index][col];
  }
  screen[screen.length - 1][col] = firstRow;
};

const shiftOneColUp = (screen, row) => {
  const firstRow = screen[row][0];
  for (let index = 1; index < screen[0].length; index++) {
    screen[row][index - 1] = screen[row][index];
  }
  screen[row][screen[0].length - 1] = firstRow;
};

const jumpColumn = (screen, col) => {
  for (let index = 0; index < col.length; index++) {
    shiftOneRowUp(screen, col[index]);
  }
};

const addGlich = (screen, chancePercent) => {
  const addGlich = chancePercent < (Math.random() * 100);
  if (!addGlich) {
    return;
  }
  for (let index = 0; index < screen[0].length; index++) {
    shiftOneRowUp(screen, index);
  }
  for (let index = 0; index < screen.length; index++) {
    shiftOneColUp(screen, index);
  }
};

const addWaterImage = (screen) => {
  const copyImage = screen.map((each) => each.map((every) => every));
  for (let index = 0; index < copyImage.length / 2; index++) {
    const currentRow = copyImage[index];
    copyImage[index] = copyImage[copyImage.length - index - 1];
    copyImage[copyImage.length - index - 1] = currentRow;
  }

  for (let idx = screen.length; idx < (copyImage.length * 2); idx++) {
    screen[idx] = copyImage[idx - copyImage.length];
  }
};

const addMirrorImage = (screen) => {
  const copyImage = screen.map((each) => each.map((every) => every));
  for (let row = 0; row < copyImage.length; row++) {
    for (let col = 0; col < copyImage[row].length / 2; col++) {
      const currentRow = copyImage[row][col];
      copyImage[row][col] = copyImage[row][copyImage[row].length - col - 1];
      copyImage[row][copyImage[row].length - col - 1] = currentRow;
    }
  }

  for (let idx = 0; idx < screen.length; idx++) {
    screen[idx] = [...screen[idx], ...copyImage[idx]];
  }
};

export const animations = () => {
  setInterval(() => {
    clearScreen();

    placeString();

    jumpColumn(SCREEN.pixels, [3, 4, 12, 13]);

    addWaterImage(SCREEN.pixels);
    addMirrorImage(SCREEN.pixels);

    frameNoice(SCREEN.pixels);
    addGlich(SCREEN.pixels, 10);
    showScreen(SCREEN.pixels);
  }, 20);
};
