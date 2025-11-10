const GAP_COL = 12
const GAP_ROW = 3

const GRID_MARKER_TOP = ["1", "2", "3"];
const GRID_MARKER_LEFT = ["A", "B", "C"];
const GRID_INPUT_MESSAGE = "Enter the valid Input in format (left top) [eg-A1] : "

const ROW_SING = "—";
const COL_SING = "|";


class CORD {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const delay = (time = 1) => {
  for (let index = 0; index < time * 1000000000; index++) {
    for (let col = 0; col < 3; col++) {

    }
  }
}




const genArray = (length, item = " ") => {
  const array = [];
  for (let index = 0; index < length; index++) {
    array.push(item);
  }
  return array;
}
const genGridOf = (cols, rows, item = " ") => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const eachRow = []
    for (let col = 0; col < cols; col++) {
      eachRow.push(item);
    }
    grid.push(eachRow)
  }

  return grid;
}

const deepCopy = (data) => {
  if (Array.isArray(data)) {
    return data.map(each => deepCopy(each));
  } else if (data === null) {
    return null;
  } else if ((typeof data) === "object") {
    return Object.keys(data).reduce((obj, key) => { obj[key] = deepCopy(data[key]); return obj; }, {});
  }
  return data;
}

const addMarkers = (grid) => {

  const markingGrid = deepCopy(grid);
  const topMarker = genArray(markingGrid.length).map((_, index) => GRID_MARKER_TOP[index]);

  markingGrid.unshift(topMarker);
  markingGrid.map((each, index) => each.unshift(GRID_MARKER_LEFT[index - 1] || " "))

  return markingGrid
}


const pad = (value, len) => {
  return value.padStart(Math.ceil(len / 2)).padEnd(Math.floor(len / 2));
}

const showGrid = (grid) => {
  return grid.map(each => each.map(every => pad(every, GAP_COL)).join("")).join("\n".repeat(GAP_ROW))
}

const markGrid = (grid, cord, icon) => {
  const newArray = deepCopy(grid)
  newArray[cord.y][cord.x] = icon;
  return newArray;
}

const isValidInput = (input) => {
  if (input.length !== 2) {
    return false;
  }
  return GRID_MARKER_LEFT.includes(input[0]) && GRID_MARKER_TOP.includes(input[1])
}

const getCordInput = (message = GRID_INPUT_MESSAGE) => {
  const input = prompt(message).trim().split("")

  if (!isValidInput(input)) {
    console.log("Please Enter the valid Input!");
    return getCordInput(message)
  }

  const row = Number(GRID_MARKER_LEFT.indexOf(input[0]))
  const col = Number(GRID_MARKER_TOP.indexOf(input[1]))
  return new CORD(col, row);
}

const usedCord = (grid, cord) => {
  return grid[cord.y][cord.x] !== " "
}

const unusedInput = (grid) => {
  const cords = getCordInput();
  return usedCord(grid, cords) ? getNonUsedCordInput(grid) : cords;
}

function checkWin(grid) {
  for (let row = 0; row < 3; row++) {
    if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2] && grid[row][0] !== " ") {
      return grid[row][0]
    }
    else if (grid[0][row] === grid[1][row] && grid[1][row] === grid[2][row] && grid[0][row] !== " ") {
      return grid[0][row]
    }
  }
  const digOneCheck = grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2] && grid[0][0] != " "
  const digTwoCheck = grid[2][0] === grid[1][1] && grid[0][2] === grid[1][1] && grid[2][0] != " "
  if (digOneCheck || digTwoCheck) {
    return grid[1][1];
  }
  return
}

const playingGrid = genGridOf(3, 3, " ");
const obj = unusedInput(playingGrid)
console.log(obj.x, obj.y);

// delay(0.2)