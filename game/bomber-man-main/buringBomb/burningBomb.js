//////////////////////////////////////////////////////////////////////////////////
// THIS IS BASIC IMPLEMENTATION OF THE BOMBERMAN! WIHTOUT ENEMY!
// WASD FOR DIRECTION. P FOR PLANTING AND O FOR BLASTING;
//////////////////////////////////////////////////////////////////////////////////
const SIZE_X = 21;
const SIZE_Y = 21;

const TOTAL_BOMB = 1;
const BOMB_RANGE = 2;

const RESET = "\x1b[0m";
function generateBlock(fg = "\x1b[38;5;120m", bg = "", icon = "█") {
  const tile = `${bg}${fg}${icon}${RESET}`;
  return tile + tile;
}

function getGroundIcon() {
  return generateBlock("\x1b[38;5;120m");
}

function getBorderBlock() {
  return generateBlock("", "\x1b[48;5;236m", "+");
}

function getSolidBox() {
  return generateBlock("", "\x1b[38;5;236m");
}

const WALL_COLORS = [
  "\x1b[48;5;34m",
  "\x1b[48;5;40m",
  "\x1b[48;5;46m",
  "\x1b[48;5;82m",
  "\x1b[48;5;118m",
  "\x1b[48;5;148m",
  "\x1b[48;5;184m",
  "\x1b[48;5;190m",
  "\x1b[48;5;220m",
  "\x1b[48;5;214m",
  "\x1b[48;5;208m",
  "\x1b[48;5;202m",
  "\x1b[48;5;196m",
  "\x1b[48;5;160m",
  "\x1b[48;5;124m",
  "\x1b[48;5;94m",
  "\x1b[48;5;130m",
  "\x1b[48;5;102m",
  "\x1b[48;5;240m",
  "\x1b[48;5;235m",
];

function getWall(burnStage = 0) {
  let bgColor = "\x1b[38;5;196m";
  if (burnStage === 0) {
    return generateBlock(bgColor, "\x1b[48;5;120m", "▦");
  }

  bgColor = WALL_COLORS[burnStage];

  const icon = generateBlock(bgColor, "\x1b[48;5;120m", "🔥");
  return icon.slice(0, icon.length / 2);
}

function getDoor() {
  const icon = generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "🚪");
  return icon.slice(0, icon.length / 2);
}

function getCharacter() {
  const icon = generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "🤖");
  return icon.slice(0, icon.length / 2);
}

function getBomb() {
  const icon = generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "💣");
  return icon.slice(0, icon.length / 2);
}

const GRASS_TILE = getGroundIcon();
const BORDER_BLOCK = getBorderBlock();
const SOLID_BOX = getSolidBox();
const WALL = getWall();
const DOOR = getDoor();
const CHARACTER = getCharacter();
const BOMB = getBomb();

function delay(duration = 1) {
  for (let count = 0; count < duration * 1000000000; count++) {}
}

function generateLine(length, icon = BORDER_BLOCK) {
  return icon.repeat(length);
}
function coverLine(line, st = BORDER_BLOCK, en = BORDER_BLOCK) {
  return st + line + en;
}

function showGrid(grid) {
  const lines = [];
  lines.push(generateLine(grid[0].length + 2));
  for (let row = 0; row < grid.length; row++) {
    const line = coverLine(grid[row].join(""));
    lines.push(line);
  }
  lines.push(generateLine(grid[0].length + 2));
  return lines.join("\n");
}

function generateGrid(sizeX = SIZE_X, sizeY = SIZE_Y, bg = GRASS_TILE) {
  const grid = [];
  for (let row = 0; row < sizeY; row++) {
    const rowAr = [];
    for (let col = 0; col < sizeX; col++) {
      rowAr.push(bg);
    }
    grid.push(rowAr);
  }
  return grid;
}

function copyGrid(grid) {
  const copyGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const copyingRow = [];
    for (let col = 0; col < grid[row].length; col++) {
      copyingRow.push(grid[row][col]);
    }
    copyGrid.push(copyingRow);
  }
  return copyGrid;
}

function isValidPos(cords) {
  const x = cords[0];
  const y = cords[1];
  if (x % 2 === 1 && y % 2 === 1) {
    return false;
  }
  return x > 1 && y > 1;
}

function randomNumber(st, end) {
  return Math.floor(Math.random() * (end - st)) + st;
}

function isValidWallPos(cords) {
  const x = cords[0];
  const y = cords[1];
  if (x % 2 === 1 && y % 2 === 1) {
    return false;
  }
  if (x < 2 && y < 2) {
    return false;
  }
  return true;
}

// function addWallToGrid(grid, walls) {
//   const gridWithWall = copyGrid(grid);
//   for (let index = 0; index < walls.length; index++) {
//     const cords = walls[index];
//     const x = cords[0];
//     const y = cords[1];
//     gridWithWall[y][x] = WALL;
//   }
//   return gridWithWall;
// }

function addWallToGrid(grid, count = 20) {
  const gridWithWall = copyGrid(grid);

  let wallsToAdd = count;
  while (wallsToAdd > 0) {
    const x = randomNumber(0, SIZE_X);
    const y = randomNumber(0, SIZE_Y);
    const cords = [x, y];
    if (isValidWallPos(cords)) {
      gridWithWall[y][x] = WALL;
      // maskCords.push(cords);
      wallsToAdd--;
    }
  }
  return gridWithWall;
}

function getDoorCords(grid) {
  let cords = [1, 1];
  while (!isValidPos(cords)) {
    const x = randomNumber(0, SIZE_X);
    const y = randomNumber(0, SIZE_Y);
    cords = [x, y];
  }
  return cords;
}

function createBomberManGrid(sizeX = SIZE_X, sizeY = SIZE_Y) {
  const grid = generateGrid(sizeX, sizeY);
  for (let row = 1; row < grid.length; row += 2) {
    for (let col = 1; col < grid[0].length; col += 2) {
      grid[row][col] = SOLID_BOX;
    }
  }
  return grid;
}

function addDoorToGrid(grid, doorCord) {
  const gridWithDoor = copyGrid(grid);
  const x = doorCord[0];
  const y = doorCord[1];
  gridWithDoor[y][x] = DOOR;
  return gridWithDoor;
}

function hideDoorWithWall(doorPos, wallMask) {
  const wallMaskWithDoor = copyGrid(wallMask);
  if (wallMaskWithDoor.includes(doorPos)) {
    return wallMaskWithDoor;
  }
  wallMaskWithDoor.push(doorCords);
  return wallMaskWithDoor;
}

// ///////////////////////////////////////////////////////////////////////////////////
// THIS IS THE MAIN FUNCTION CALLS FOR THIS
// ///////////////////////////////////////////////////////////////////////////////////

function alignLeft(line, length = 1) {
  return `${"   ".repeat(length)} |${line}`;
}

const CHOICES = ["w", "s", "d", "a", "p", "o"];
function userInput() {
  const choice = prompt(alignLeft("Enter : ")).toLowerCase();
  if (CHOICES.includes(choice)) {
    return choice;
  }
  console.log("\n" + alignLeft("Please enter the valid input!", 1));
  return userInput();
}

function moveCharacterCords(grid, charCord, input) {
  let x = charCord[0];
  let y = charCord[1];

  switch (input) {
    case "a":
      x = x === 0 ? x : x - 1;
      break;
    case "d":
      x = x === SIZE_X - 1 ? x : x + 1;
      break;
    case "w":
      y = y === 0 ? y : y - 1;
      break;
    case "s":
      y = y === SIZE_Y - 1 ? y : y + 1;
      break;
  }

  if (grid[y][x] === GRASS_TILE) {
    return [x, y];
  }

  return [charCord[0], charCord[1]];
}

function addCharacterToGrid(grid, cords) {
  const gridWithCharacter = copyGrid(grid);
  const x = cords[0];
  const y = cords[1];
  gridWithCharacter[y][x] = CHARACTER;
  return gridWithCharacter;
}

function breakWallCord(grid, charCord, input) {
  let x = charCord[0];
  let y = charCord[1];

  switch (input) {
    case "j":
      x = x === 0 ? x : x - 1;
      break;
    case "l":
      x = x === SIZE_X - 1 ? x : x + 1;
      break;
    case "i":
      y = y === 0 ? y : y - 1;
      break;
    case "k":
      y = y === SIZE_Y - 1 ? y : y + 1;
      break;
  }

  if (grid[y][x] === WALL) {
    return [x, y];
  }

  return [charCord[0], charCord[1]];
}

function removeCordIfInWall(wall, cord) {
  const newWalls = [];
  const x = cord[0];
  const y = cord[1];
  for (let index = 0; index < wall.length; index++) {
    const walX = wall[index][0];
    const walY = wall[index][1];
    if (x !== walX || y !== walY) {
      newWalls.push([walX, walY]);
    }
  }
  return newWalls;
}

// function checkWin(grid, charCord, input) {
//   let x = charCord[0];
//   let y = charCord[1];

//   switch (input) {
//     case "a":
//       x = x === 0 ? x : x - 1;
//       break;
//     case "d":
//       x = x === SIZE_X - 1 ? x : x + 1;
//       break;
//     case "w":
//       y = y === 0 ? y : y - 1;
//       break;
//     case "s":
//       y = y === SIZE_Y - 1 ? y : y + 1;
//       break;
//   }

//   if (grid[y][x] === DOOR) {
//     return true;
//   }

//   return false;
// }

function placeBombs(bombs, charCord) {
  const newBombs = copyGrid(bombs);
  const x = charCord[0];
  const y = charCord[1];
  newBombs.push([x, y]);
  return newBombs;
}

function addBombToGrid(grid, bombs) {
  const gridWithBomb = copyGrid(grid);
  for (let index = 0; index < bombs.length; index++) {
    const bombX = bombs[index][0];
    const bombY = bombs[index][1];
    gridWithBomb[bombY][bombX] = BOMB;
  }
  return gridWithBomb;
}

function removeWall(walls, x, y, dx, dy, count = BOMB_RANGE) {
  if (count === -1) {
    return walls;
  }
  let newWalls = removeCordIfInWall(walls, [x, y]);
  if (newWalls.length !== walls.length) {
    return newWalls;
  }
  return removeWall(walls, x + dx, y + dy, dx, dy, count - 1);
}

function includeInArray(array1, array2) {
  for (let index = 0; index < array1.length; index++) {
    let same = true;
    for (let itr = 0; itr < array1[index].length; itr++) {
      if (array2[itr] !== array1[index][itr]) {
        same = false;
        break;
      }
    }
    if (same) {
      return true;
    }
  }
  return false;
}

function copyCord(cord) {
  return [cord[0], cord[1]];
}

function differenceBtwArrays(array, array2) {
  const differentElements = [];
  for (let index = 0; index < array.length; index++) {
    if (!includeInArray(array2, array[index])) {
      const differentCords = copyCord(array[index]);
      differentElements.push(differentCords);
    }
  }
  return differentElements;
}

function burningWallShow(grid, burningWalls, stage = 1) {
  console.clear();
  const gridWhileBuring = copyGrid(grid);

  for (let index = 0; index < burningWalls.length; index++) {
    const x = burningWalls[index][0];
    const y = burningWalls[index][1];

    gridWhileBuring[y][x] = getWall(stage);
  }
  console.log(showGrid(gridWhileBuring));
  delay(0.02);
  return stage === 19 ? "" : burningWallShow(grid, burningWalls, stage + 1);
}

function replacePlaces(grid, x, y, dx, dy, icon, count = BOMB_RANGE) {
  if (
    x < 0 ||
    y < 0 ||
    x === SIZE_X ||
    y === SIZE_Y ||
    count === -1 ||
    grid[y][x] === SOLID_BOX
  ) {
    return grid;
  }

  if (grid[y][x] === WALL) {
    grid[y][x] = icon;
    return grid;
  }

  grid[y][x] = icon;
  return replacePlaces(grid, x + dx, y + dy, dx, dy, icon, count - 1);
}

function replaceBombBlaskWith(grid, bombCord, icon) {
  let gridWithReplaceIcon = copyGrid(grid);

  gridWithReplaceIcon = replacePlaces( gridWithReplaceIcon, bombCord[0], bombCord[1], 1, 0, icon );
  gridWithReplaceIcon = replacePlaces( gridWithReplaceIcon, bombCord[0], bombCord[1], -1, 0, icon );
  gridWithReplaceIcon = replacePlaces( gridWithReplaceIcon, bombCord[0], bombCord[1], 0, -1, icon );
  gridWithReplaceIcon = replacePlaces( gridWithReplaceIcon, bombCord[0], bombCord[1], 0, 1, icon);
  return gridWithReplaceIcon;
}

function blaskBomb(grid, bombCord, charPos, count = 1) {
  if (count === WALL_COLORS.length) {
    return replaceBombBlaskWith(grid, bombCord, GRASS_TILE);
  }
  console.clear();
  const buringGrid = replaceBombBlaskWith(grid, bombCord, getWall(count));
  buringGrid[charPos[1]][charPos[0]] = CHARACTER;
  console.log(showGrid(buringGrid));
  return blaskBomb(grid, bombCord, charPos, count + 1);
}

function isCordSame(cord1, cord2) {
  return cord1[0] === cord2[0] && cord1[1] === cord2[1];
}

function checkWin(userCord, doorCord) {
  return isCordSame(userCord, doorCord);
}
function playGame(grid, doorCord, charPos, bombs, moves) {
  console.clear();
  const gridWithWall = grid;

  const gridWithBombs = addBombToGrid(gridWithWall, bombs);

  const gridWithChar = addCharacterToGrid(gridWithBombs, charPos);
  console.log(showGrid(gridWithChar));

  let newBombs = copyGrid(bombs);
  let newCharCord = [charPos[0], charPos[1]];
  let newGrid = copyGrid(grid);

  if (checkWin(charPos, doorCord)) {
    console.log("You won!");
    return;
  }

  const input = userInput();

  if (["a", "d", "s", "w"].includes(input)) {
    newCharCord = moveCharacterCords(gridWithBombs, charPos, input);
  } else {
    if (input === "p" && bombs.length < TOTAL_BOMB) {
      newBombs = placeBombs(bombs, charPos);
    } else if (
      input === "o" &&
      bombs.length > 0 &&
      !isCordSame(charPos, newBombs[0])
    ) {
      newGrid = blaskBomb(gridWithBombs, newBombs[0], charPos);
      newBombs.shift();
    }
  }

  playGame(newGrid, doorCord, newCharCord, newBombs, moves + 1);
}

const grid = createBomberManGrid();

const doorCords = getDoorCords();
// const doorCords = [1,0];
const characterPos = [0, 0];

const gridWithWall = addWallToGrid(grid, 140);
gridWithWall[doorCords[1]][doorCords[0]] = WALL;

playGame(gridWithWall, doorCords, characterPos, [], 0);
