//////////////////////////////////////////////////////////////////////////////////
// THIS IS BASIC IMPLEMENTATION OF THE BOMBERMAN! WIHT ENEMY!
// WASD FOR DIRECTION. P FOR PLANTING AND O FOR BLASTING;
//////////////////////////////////////////////////////////////////////////////////
const SIZE_X = 21;
const SIZE_Y = 21;
const MAX_TOTAL_WALLS = 140;
const ENEMY_COUNT = 10

const RESET = "\x1b[0m";
function generateBlock(fg = "\x1b[38;5;120m", bg = "", icon = "█", times = 1) {
  const tile = `${bg}${fg}${icon.repeat(times)}${RESET}`;
  return tile;
}

function getGroundIcon() {
  return generateBlock("\x1b[38;5;120m", "", "█", 2);
}

function getBorderBlock() {``
  return generateBlock("", "\x1b[48;5;236m", "+", 2);
}

function getSolidBox() {
  return generateBlock("", "\x1b[38;5;236m", "█", 2);
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
    return generateBlock(bgColor, "\x1b[48;5;120m", "▦", 2);
  }

  bgColor = WALL_COLORS[burnStage];

  return generateBlock(bgColor, "\x1b[48;5;120m", "🔥");
}

function getDoor() {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "🚪");
}

function getCharacter() {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "🤖");
}

function getBomb() {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", "💣");
}

function getBombBoost() {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;240m", "💣");
}

function getBlastBoost() {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;240m", "💥");
}
function getENEMY(icon = "👽") {
  return generateBlock("\x1b[38;5;196m", "\x1b[48;5;120m", icon);
}

const GRASS_TILE = getGroundIcon();
const BORDER_BLOCK = getBorderBlock();
const SOLID_BOX = getSolidBox();
const WALL = getWall();
const DOOR = getDoor();
const CHARACTER = getCharacter();
const BOMB = getBomb();
const BOMB_BOOST = getBombBoost();
const BLAST_BOOST = getBlastBoost();

const ENEMY1 = getENEMY("👽");
const ENEMY2 = getENEMY("👾");

const ENEMYS_CANDIDATES = [ENEMY1, ENEMY2];

const CHARACTER_WALK_OVER = [
  GRASS_TILE,
  DOOR,
  BOMB_BOOST,
  BLAST_BOOST,
  ENEMY1,
  ENEMY2,
];

const ENEMY_WALK_OVER = [
  DOOR,
  BOMB_BOOST,
  BLAST_BOOST,
  ENEMY1,
  ENEMY2,
  GRASS_TILE,
  CHARACTER,
];

let TOTAL_BOMB = 1;
let BOMB_RANGE = 1;
let ENEMY = [];

function delay(duration = 1) {
  for (let count = 0; count < duration * 1000000000; count++) {
    for (let count1 = 0; count1 < 100000000000 ; count1++){}
  }
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

function randomNumber(st, end) {
  return Math.floor(Math.random() * (end - st)) + st;
}

function getWalls(count = 140) {
  const walls = [];
  let wallsToAdd = count;

  while (wallsToAdd > 0) {
    const x = randomNumber(0, SIZE_X);
    const y = randomNumber(0, SIZE_Y);
    const cords = [x, y];
    if (isValidPos(cords, [])) {
      walls.push(cords);
      wallsToAdd--;
    }
  }
  return walls;
}

function addWallsToGrid(grid, walls) {
  const gridWithWall = deepCopy(grid);
  for (let index = 0; index < walls.length; index++) {
    const x = walls[index][0];
    const y = walls[index][1];
    gridWithWall[y][x] = WALL;
  }
  return gridWithWall;
}

function isValidPos(cords, usedPlaces) {
  const x = cords[0];
  const y = cords[1];
  if (includeInArray(usedPlaces, cords)) {
    return false;
  }
  if (x % 2 === 1 && y % 2 === 1) {
    return false;
  }
  return x > 1 || y > 1;
}

function getItemPlacingCord(usedPlaces) {
  let cords = [1, 1];
  while (!isValidPos(cords, usedPlaces)) {
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
  const gridWithDoor = deepCopy(grid);
  const x = doorCord[0];
  const y = doorCord[1];
  gridWithDoor[y][x] = DOOR;
  return gridWithDoor;
}

// ///////////////////////////////////////////////////////////////////////////////////
// THIS IS THE MAIN FUNCTION CALLS FOR THIS
// ///////////////////////////////////////////////////////////////////////////////////

let GAME_STATUS = "PLAYING";
const hiddenItems = [];
const bombsCords = [];

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

  if (CHARACTER_WALK_OVER.includes(grid[y][x])) {
    return [x, y];
  }

  return [charCord[0], charCord[1]];
}

function addCharacterToGrid(grid, cords) {
  const gridWithCharacter = deepCopy(grid);
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

function placeBombs(charCord) {
  const x = charCord[0];
  const y = charCord[1];
  return [x, y];
}

function addBombsToGrid(grid, bombs) {
  const gridWithBomb = deepCopy(grid);
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

function checkCordInIcons(icons, cords) {
  for (let index = 0; index < icons.length; index++) {
    let same = true;
    const cor = icons[index][1];

    for (let itr = 0; itr < cor.length; itr++) {
      if (cords[itr] !== cor[itr]) {
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

function isDeepEqual(item1, item2) {
  if (Array.isArray(item1) && Array.isArray(item2)) {
    if (item1.length !== item2.length) {
      return false;
    }
    for (let index = 0; index < item1.length; index++) {
      if (!isDeepEqual(item1[index], item2[index])) {
        return false;
      }
    }
    return true;
  }
  return item1 === item2;
}


function removeItemFromArray(array, item) {
  const newArray = [];

  for (let index = 0; index < array.length; index++) {
    if (!isDeepEqual(array[index][1], item)) {
      newArray.push(array[index]);
    }
  }
  return newArray;
}

function replacePlaces(grid, cord, adding, icon, count = BOMB_RANGE) {
  const x = cord[0];
  const y = cord[1];

  const dx = adding[0];
  const dy = adding[1];
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

  if (grid[y][x] === CHARACTER) {
    GAME_STATUS = "GAME_OVER";
  }

  if (checkCordInIcons(ENEMY, cord)) {
    ENEMY = removeItemFromArray(ENEMY, cord);
  }
  grid[y][x] = icon;
  return replacePlaces(grid, [x + dx, y + dy], adding, icon, count - 1);
}

function replaceBombBlastWith(grid, bombCord, icon) {
  let gridWithReplaceIcon = deepCopy(grid);

  gridWithReplaceIcon = replacePlaces(
    gridWithReplaceIcon,
    bombCord,
    [1, 0],
    icon
  );
  gridWithReplaceIcon = replacePlaces(
    gridWithReplaceIcon,
    bombCord,
    [-1, 0],
    icon
  );
  gridWithReplaceIcon = replacePlaces(
    gridWithReplaceIcon,
    bombCord,
    [0, 1],
    icon
  );
  gridWithReplaceIcon = replacePlaces(
    gridWithReplaceIcon,
    bombCord,
    [0, -1],
    icon
  );
  return gridWithReplaceIcon;
}

function blastBomb(grid, bombCord, charPos, ENEMY, count = 1) {
  if (count === WALL_COLORS.length) {
    return replaceBombBlastWith(grid, bombCord, GRASS_TILE);
  }

  const buringGrid = replaceBombBlastWith(grid, bombCord, getWall(count));
  const chX = charPos[0];
  const chY = charPos[1];
  let gridWithEntities = deepCopy(buringGrid);

  gridWithEntities[chY][chX] = CHARACTER;
  gridWithEntities = addEnemyToGrid(gridWithEntities);

  console.clear();
  console.log(showGrid(gridWithEntities));

  return blastBomb(grid, bombCord, charPos, ENEMY, count + 1);
}

function isCordSame(cord1, cord2) {
  return cord1[0] === cord2[0] && cord1[1] === cord2[1];
}

function checkWin(userCord, doorCord) {
  return isCordSame(userCord, doorCord);
}

function setAction(grid, cord) {
  const x = cord[0];
  const y = cord[1];

  const icon = grid[y][x];

  if (ENEMYS_CANDIDATES.includes(icon)) {
    GAME_STATUS = "GAME_OVER";
    return;
  }

  switch (icon) {
    case DOOR:
      GAME_STATUS = ENEMY.length === 0 ? "LEVEL_CROSSED" : GAME_STATUS;
      return;
    case BOMB_BOOST:
      TOTAL_BOMB += 1;
      return;
    case BLAST_BOOST:
      BOMB_RANGE += 1;
      return;
  }
}

function deepCopy(item) {
  if (Array.isArray(item)) {
    const copyItem = [];
    for (let index = 0; index < item.length; index++) {
      const eachItemPart = deepCopy(item[index]);
      copyItem.push(eachItemPart);
    }
    return copyItem;
  }
  return item;
}

function canEnemyMove(pos, grid) {
  const x = pos[0];
  const y = pos[1];

  if (y > 0 && ENEMY_WALK_OVER.includes(grid[y - 1][x])) {
    return true;
  }
  if (y < SIZE_Y - 1 && ENEMY_WALK_OVER.includes(grid[y + 1][x])) {
    return true;
  }

  if (x > 0 && ENEMY_WALK_OVER.includes(grid[y][x - 1])) {
    return true;
  }

  if (x < SIZE_X - 1 && ENEMY_WALK_OVER.includes(grid[y][x + 1])) {
    return true;
  }

  return false;
}

function isValidEnemyMove(grid, pos) {
  const x = pos[0];
  const y = pos[1];
  if (x < 0 || x >= SIZE_X || y < 0 || y >= SIZE_Y){
    return false;
  }
  return ENEMY_WALK_OVER.includes(grid[y][x]);
}

function moveSingleEnemy(pos, grid) {
  let newPos = deepCopy(pos);
  if (!canEnemyMove(pos, grid)) {
    return newPos;
  }

  newPos = [1, 1];
  while (!isValidEnemyMove(grid, newPos)) {
    newPos = deepCopy(pos);
    const direction = Math.floor(Math.random() * 2);
    const addingFactor = -1 + Math.floor(Math.random() * 2) * 2;
    newPos[direction] += addingFactor;
  }
  return newPos;
}

function moveEnemy(grid) {
  const newEnemyMoves = [];
  for (let index = 0; index < ENEMY.length; index++) {
    const enemyData = ENEMY[index];
    const newEnemyData = moveSingleEnemy(enemyData[1], grid);
    newEnemyMoves.push([enemyData[0], newEnemyData]);
  }
  ENEMY = newEnemyMoves;
}

function addEnemyToGrid(grid) {
  const gridWithEnemy = deepCopy(grid);
  for (let index = 0; index < ENEMY.length; index++) {
    const enemy = ENEMY[index];
    const x = enemy[1][0];
    const y = enemy[1][1];
    gridWithEnemy[y][x] = enemy[0];
  }
  return gridWithEnemy;
}

function playGame(grid, bombsCords, hiddenItems, charPos) {
  console.clear();

  if (GAME_STATUS === "GAME_OVER" || checkCordInIcons(ENEMY, charPos)) {
    const gridWithEnemy = addEnemyToGrid(grid);
    console.log(showGrid(gridWithEnemy));
    console.log("YOU LOST!");
    return;
  }

  const newHiddenItem = [];

  for (let index = 0; index < hiddenItems.length; index++) {
    const item = hiddenItems[index];
    const x = item[1][0];
    const y = item[1][1];

    if (isCordSame(charPos, item[1])) {
      setAction(grid, charPos);
      grid[y][x] = item[0] !== DOOR ? GRASS_TILE : grid[y][x];
      if (item[0] === DOOR) {
        newHiddenItem.push(item);
      }
    } else if (grid[y][x] === GRASS_TILE) {
      grid[y][x] = item[0];
      newHiddenItem.push(hiddenItems[index]);
    } else {
      newHiddenItem.push(hiddenItems[index]);
    }
  }

  const gridWithBombs = addBombsToGrid(grid, bombsCords);
  const gridWithEmeny = addEnemyToGrid(gridWithBombs);
  const gridWithChar = addCharacterToGrid(gridWithEmeny, charPos);

  let newCharCord = [charPos[0], charPos[1]];
  let newGrid = deepCopy(grid);

  console.log(showGrid(gridWithChar));
  if (GAME_STATUS === "LEVEL_CROSSED") {
    console.log("You won!");
    return;
  }
  moveEnemy(gridWithBombs);
  const input = userInput();

  if (["a", "d", "s", "w"].includes(input)) {
    newCharCord = moveCharacterCords(gridWithBombs, charPos, input);
  } else {
    if (input === "p" && bombsCords.length < TOTAL_BOMB) {
      const cord = placeBombs(charPos);
      bombsCords.push(cord);
    } else if (
      input === "o" &&
      bombsCords.length > 0 &&
      !isCordSame(charPos, bombsCords[0])
    ) {
      newGrid = blastBomb(gridWithBombs, bombsCords[0], charPos, ENEMY);
      bombsCords.shift();
    }
  }

  playGame(newGrid, bombsCords, newHiddenItem, newCharCord);
}

const grid = createBomberManGrid();

const characterPos = [0, 0];

let walls = getWalls(MAX_TOTAL_WALLS);

const gridWithWall = addWallsToGrid(grid, walls);

const doorCords = getItemPlacingCord(hiddenItems);
gridWithWall[doorCords[1]][doorCords[0]] = WALL;
const doorItem = [DOOR, doorCords];
hiddenItems.push(doorItem);

const bombBoostCord = getItemPlacingCord(hiddenItems);
gridWithWall[bombBoostCord[1]][bombBoostCord[0]] = WALL;
const bombTokenItem = [BOMB_BOOST, bombBoostCord];
hiddenItems.push(bombTokenItem);

const blastBoostCord = getItemPlacingCord(hiddenItems);
gridWithWall[blastBoostCord[1]][blastBoostCord[0]] = WALL;
const fireBoostItem = [BLAST_BOOST, blastBoostCord];
hiddenItems.push(fireBoostItem);

for (let index = 0; index < ENEMY_COUNT; index++) {
  const enemyCord = getItemPlacingCord(walls);
  const enemyType =
    ENEMYS_CANDIDATES[Math.floor(Math.random() * ENEMYS_CANDIDATES.length)];
  ENEMY.push([enemyType, enemyCord]);
  walls = removeItemFromArray(walls, enemyCord);
}

playGame(gridWithWall, bombsCords, hiddenItems, characterPos);