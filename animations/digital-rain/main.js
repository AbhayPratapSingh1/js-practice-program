const BG_ICON = " ";

const DROPS = [];

const RAIN_CHANCE_PERCENTAGE = 5;
const DROP_EFFECT_LENGTH = 4;

const SCREEN_DIMENSTION = {
  width: 20,
  height: 20,
};

const DROP_PATTERNS = [..."012"];

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
  console.log("┌" + "—".repeat(screen[0].length) + "┐");
  console.log(screen.map((each) => "|" + each.join("") + "|").join("\n"));
  console.log("└" + "—".repeat(screen[0].length) + "┘");
};

function rgb(r, g, b, text) {
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
}

const randomNoBetween = (st, end) => {
  return st + Math.floor(Math.random() * (end - st));
};

const createNewDrop = (x) => ({
  value: DROP_PATTERNS[randomNoBetween(0, DROP_PATTERNS.length)],
  y: -1,
  x,
});

const updateSingleDrop = (drop) => {
  drop.y += 1;
};

const updateRainDrop = (drops, screen) => {
  drops.forEach((drop) => {
    updateSingleDrop(drop);
  });

  const dropOutOfRange = screen.length + DROP_EFFECT_LENGTH;
  while (drops.length > 0 && drops[0].y > dropOutOfRange) {
    drops.shift();
  }
};

const drawNewDrops = (screen, dropes) => {
  for (let colNo = 0; colNo < screen[0].length; colNo++) {
    const shouldAddDrop = (Math.random() * 100) < RAIN_CHANCE_PERCENTAGE;
    if (shouldAddDrop) {
      dropes.push(createNewDrop(colNo));
    }
  }
};

const drawSingleDrop = (screen, drop) => {
  const x = drop.x;
  const starting = Math.min(screen.length - 1, drop.y);
  const ending = Math.max(-1, drop.y - DROP_EFFECT_LENGTH);

  for (let index = starting; index > ending; index--) {
    const difference = (drop.y - index) * (180 / DROP_EFFECT_LENGTH);
    const gFactor = 255 - Math.floor(difference);
    screen[index][x] = rgb(50, gFactor, 50, drop.value);
  }
};

const drawDrops = (screen, drops) => {
  drops.forEach((drop) => {
    drawSingleDrop(screen, drop);
  });
};

const t = setInterval(() => {
  clearScreen();

  drawNewDrops(SCREEN, DROPS);
  updateRainDrop(DROPS, SCREEN);
  drawDrops(SCREEN, DROPS);

  showScreen(SCREEN);
}, 40);
