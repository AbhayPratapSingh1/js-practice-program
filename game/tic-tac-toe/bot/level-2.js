const GAP_COL = 3
const GAP_ROW = 3

const GRID_MARKER_TOP = ["1", "2", "3"];
const GRID_MARKER_LEFT = ["A", "B", "C"];
const GRID_INPUT_MESSAGE = "Enter the valid Input in format (left top) [eg-A1] : "

const ROW_SING = "—";
const COL_SING = "|";


function delay() {
  for (let index = 0; index < 1000000000; index++) {
    for (let col = 0; col < 3; col++) {

    }
  }

}


function genGridOf(cols, rows, item = " ") {
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

function copyGrid(grid) {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const colLine = []
    for (let col = 0; col < grid[row].length; col++) {
      colLine.push(grid[row][col])
    }
    newGrid.push(colLine)
  }
  return newGrid;
}

function addGridOn(grid1, grid2, row = GAP_ROW, col = GAP_COL) {
  const resGrid = copyGrid(grid2)
  for (let rIndex = 0; rIndex < grid1.length; rIndex++) {

    for (let cIndex = 0; cIndex < grid1[rIndex].length; cIndex++) {
      if (grid1[rIndex][cIndex] !== " ") {
        resGrid[rIndex + row][cIndex + col] = grid1[rIndex][cIndex];
      }
    }
  }
  return resGrid
}


function gridMarker(grid, marks, length = 3) {
  const line1 = [];
  line1.push("".padStart(length));
  for (let index = 0; index < marks; index++) {
    const element = GRID_MARKER_TOP.padStart(length);
    line1.push(element);
  }
  for (let index = 0; index < grid.length; index++) {
    grid[index] = GRID_MARKER_LEFT[index].padStart(length) + grid[index];
  }

  grid.unshift(line1.join(""));
  return grid
}

function addItem(arr, len, item = " ") {
  for (let index = 0; index < len; index++) {
    arr.push(item);
  }
}

function makeMarkerGrid(row, col, gapRow = GAP_ROW, gapCol = GAP_COL) {
  const diffRow = (gapRow - 1) / 2;
  const diffCol = (gapCol - 1) / 2;
  const grid = [];
  const line1 = [""];
  addItem(line1, gapCol)
  const emptyLine = []
  addItem(emptyLine, gapCol);
  for (let index = 0; index < row; index++) {
    addItem(emptyLine, gapCol);

    addItem(line1, diffCol);
    line1.push(GRID_MARKER_TOP[index])
    addItem(line1, diffCol);
  }

  addItem(grid, diffRow, emptyLine);
  grid.push(line1);
  addItem(grid, diffRow, emptyLine);

  for (let index = 0; index < col; index++) {
    addItem(grid, diffRow, emptyLine);

    const markCol = []
    addItem(markCol, diffCol)
    markCol.push(GRID_MARKER_LEFT[index]);
    addItem(markCol, grid[0].length - diffCol - 1)

    grid.push(markCol)


    addItem(grid, diffRow, emptyLine);
  }
  return grid;
}

function mapGridSize(inputGrid, gapRow = GAP_ROW, gapCol = GAP_COL) {
  const diffRow = (gapRow - 1) / 2;
  const diffCol = (gapCol - 1) / 2;
  const grid = [];


  for (let row = 0; row < inputGrid.length; row++) {
    const eachRow = []
    const emptyLine = []
    addItem(emptyLine, gapCol * inputGrid[row].length)
    // added empty line
    addItem(grid, diffRow, emptyLine);
    //addig main row
    for (let col = 0; col < inputGrid[row].length; col++) {
      addItem(eachRow, diffCol)
      eachRow.push(inputGrid[row][col]);
      addItem(eachRow, diffCol)
    }
    grid.push(eachRow)
    // added empty line
    addItem(grid, diffRow, emptyLine);
  }

  return grid;
}

function generateArrayLine(size, mainChar = " ", st = "+", end = "+") {
  const line = [];
  line.push(st)
  for (let index = 0; index < size; index++) {
    line.push(mainChar);
  }
  line.push(end)
  return line.slice(0);
}

function generateRectangle(width = 10, height = 10, colSign = COL_SING, rowSign = ROW_SING) {
  const grid = [];
  grid.push(generateArrayLine(width, rowSign));
  for (let count = 0; count < height - 2; count++) {
    grid.push(generateArrayLine(width, " ", colSign, colSign));
  }
  grid.push(generateArrayLine(width, rowSign));
  return grid;
}

function finalPrintablGrid(grid, marginVert = 3, marginHor = 1) {
  const leftMargin = "\t".repeat(marginHor)
  const verticalMargin = "\n".repeat(marginVert);

  const printingGrid = []

  for (let index = 0; index < grid.length; index++) {
    printingGrid.push(leftMargin + grid[index].join(" "));
  }

  return verticalMargin + printingGrid.join("\n") + verticalMargin
}

function markGrid(grid, cord, sign) {
  const row = cord[0];
  const col = cord[1];
  const newArray = copyGrid(grid)
  newArray[row][col] = sign;
  return newArray;
}

function isValidGridMarks(mark1, mark2) {
  return GRID_MARKER_LEFT.includes(mark1) && GRID_MARKER_TOP.includes(mark2)
}


function getCordInput(message = GRID_INPUT_MESSAGE) {
  const input = prompt(message).trim().split("")
  let isInvalid = input.length !== 2 || !isValidGridMarks(input[0], input[1]) || typeof +input[1] !== "number";

  if (isInvalid) {
    console.log("Please Enter the valid Input!");
    return getCordInput(message)
  }

  const row = parseInt(GRID_MARKER_LEFT.indexOf(input[0]))
  const col = parseInt(GRID_MARKER_TOP.indexOf(input[1]))
  return [row, col]
}

function invalidCord(grid, [row, col]) {
  return grid[row][col] !== " "
}

function getNonUsedCordInput(grid) {
  const cords = getCordInput();
  if (invalidCord(grid, cords)) {
    console.log("Cordinate Already Occupied!\nEnter again!");
    return getNonUsedCordInput(grid)
  }
  return cords
}

/////////////////////////////////////////////////////////////////////////
// MAIN LOGIC FINALLY START HERE
/////////////////////////////////////////////////////////////////////////


function generateOutPut(grid, message) {
  const markerGrid = makeMarkerGrid(3, 3)
  const mapedSizeGrid = mapGridSize(grid)
  const valuedFilledGrid = addGridOn(mapedSizeGrid, markerGrid)

  const rectangle = generateRectangle(7, 9);
  const finalGridArray = addGridOn(rectangle, valuedFilledGrid)

  const printingMessage = message;
  return finalPrintablGrid(finalGridArray) + printingMessage;
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
  return "";
}

function checkForDiagnol(grid, icon, row, col, offset) {
  let point = 0;
  for (let index = 0; index < 3; index++) {
    const rowCord = row === col ? index : 2 - index;

    if (grid[rowCord][index] === icon) {
      point += offset;
    }
  }
  return point > offset ? offset * 12 : point;
}

function checkForCenter(grid, icon, offset) {
  let point_diag1 = 0
  let point_diag2 = 0
  let point = 0

  for (let index = 0; index < 3; index++) {
    if (grid[index][index] === icon) {
      point_diag1 += offset;
    }
    if (grid[2 - index][index] === icon) {
      point_diag2 += offset;
    }
  }
  if (point_diag1 > offset) {
    point += 10 * offset;
  }

  if (point_diag2 > offset) {
    point += 10 * offset;
  }
  return point + point_diag1 + point_diag2;
}

const isCorner = function (y, x) {
  return ((x + y) % 2) === 0;
}
const isCenter = function (y, x) {
  return x === y && x === 1
}

const checkCol = function (grid, icon, row, col, offset) {
  let points = 0;
  let index = 0;
  while (index < 3) {
    const currentItem = grid[row][index];
    if (currentItem === icon && index !== col) {
      points += offset;
    } else if (currentItem !== " ") {
      points = -1;
      index = 3;
    }
    index++
  }
  return points === offset * 2 ? 10 * offset : points;
}

const checkRow = function (grid, icon, row, col, offset) {
  let points = 0;
  let index = 0;

  index = 0;
  while (index < 3) {
    const currentItem = grid[index][col];
    if (currentItem === icon && index !== row) {
      points += offset;
    } else if (currentItem !== " ") {
      points = -1;
      index = 3;
    }
    index++
  }
  return points === offset * 2 ? 10 * offset : points;
}

const checkDiag1 = function (grid, icon, row, col, offset) {
  let points = 0;
  let index = 0;

  index = 0;

  while (index < 3) {
    const currentItem = grid[index][index];
    if (currentItem === icon && index !== row) {
      points += offset;
    } else if (currentItem !== " ") {
      points = -1;
      index = 3;
    }
    index++
  }
  return points === offset * 2 ? 10 * offset : points;
}
const checkDiag2 = function (grid, icon, row, col, offset) {
  let points = 0;
  let index = 0;

  index = 0;

  while (index < 3) {
    const currentItem = grid[index][2 - index];
    if (currentItem === icon && index !== row) {
      points += offset;
    } else if (currentItem !== " ") {
      points = -1;
      index = 3;
    }
    index++
  }
  return points === offset * 2 ? 10 * offset : points;
}

const cordinatePoint = function (grid, icon, row, col, offset) {
  let points = 0;
  if (isCenter(row, col)) {
    points = checkDiag1(grid, icon, row, col, offset);
    points += checkDiag2(grid, icon, row, col, offset);
  }
  if (isCorner(row, col)) {
    if (row === col) {
      points = checkDiag1(grid, icon, row, col, offset);
    } else {
      points = checkDiag2(grid, icon, row, col, offset)
    }
  }

  points += checkRow(grid, icon, row, col, offset) + checkCol(grid, icon, row, col, offset);
  return points;
}

// function cordinatePointPrev(grid, icon, row, col, offset) {
//   if (grid[row][col] !== " ") {
//     return -1;
//   }
//   let point = 0
//   if (row % 2 === 0 && col % 2 === 0) {
//     point += checkForDiagnol(grid, icon, row, col, offset)
//   }
//   if ((row === 1 && col === 1)) {
//     point += checkForCenter(grid, icon, row, col, offset);
//   }
//   let point_row = 0;
//   let point_col = 0;

//   for (let index = 0; index < 3; index++) {
//     const rowCheck = grid[row][index];
//     const colCheck = grid[index][col];
//     if (rowCheck === icon) {
//       point_row += offset;
//     }

//     if (colCheck === icon) {
//       point_col += offset;
//     }
//   }

//   if (point_col > offset) {
//     point += offset * 10;
//   }

//   if (point_row > offset) {
//     point += offset * 10;
//   }

//   return point + point_row + point_col;
// }

function mergeGrid(grid1, grid2) {
  const mergedGrid = genGridOf(3, 3);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      mergedGrid[row][col] = grid1[row][col] + grid2[row][col];
    }
  }
  return mergedGrid;
}

function sumOfEachPoint(scores) {
  let sum = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      sum += scores[row][col];
    }
  }
  return sum;
}

function markNewGrid(grid, scores, icon, offset, count) {
  const newPoints = genGridOf(3, 3, 0);

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === " ") {
        const newAssumedGrid = copyGrid(grid)
        newAssumedGrid[row][col] = icon;

        const newAssumedPoints = genPointGrid(newAssumedGrid, icon, offset / 10, count);
        newPoints[row][col] = sumOfEachPoint(newAssumedPoints);
      }
    }
  }


  return newPoints
}


function genPointGrid(grid, icon, offset, count = 3) {
  const scores = genGridOf(3, 3);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      scores[row][col] = cordinatePoint(grid, icon, row, col, offset);
    }
  }

  if (count !== 1) {
    const morePoints = markNewGrid(grid, scores, icon, offset / 2, count - 1)
    return mergeGrid(morePoints, scores);
  }
  return scores
}

function getMaxPoint(score) {
  let max = -1;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      max = score[row][col] > max ? score[row][col] : max;
    }
  }
  return max;
}

function checkJustWin(grid, icon, offset) {

  const scores = genPointGrid(grid, icon, offset, 1);
  const maxScores = getMaxPoint(scores);
  const winPos = getMaxPointLoc(scores);
  if (maxScores > offset) {
    return winPos;
  }

  return [-1, -1];
}

function getMaxPointLoc(pointMatrix) {
  let max = 0;
  let maxCol = 0;
  let maxRow = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (max < pointMatrix[row][col]) {
        max = pointMatrix[row][col];
        maxRow = row
        maxCol = col;
      }
    }
  }
  return [maxRow, maxCol];
}

function showPlayerDetail(player1, player1Icon, player2, player2Icon) {
  console.log("player 1 : ", player1, player1Icon);
  console.log("player 2 : ", player2, player2Icon);
}

function gameRound(grid, roundsLeft, player1, player1Icon, player2, player2Icon, turnOfComputer = true) {
  console.clear()
  showPlayerDetail(player1, player1Icon, player2, player2Icon);

  const winerIcon = checkWin(grid);
  if (winerIcon !== "") {
    const winnderMessage = `Congracts : ${winerIcon === player1Icon ? player1 : player2} ${winerIcon === player1Icon ? player1Icon : player2Icon}`
    console.log(generateOutPut(grid, winnderMessage));
    return;
  }

  if (roundsLeft === 0) {
    console.log(generateOutPut(grid, "Hard Luck! Its a draw!"));
    return;
  }

  console.log(generateOutPut(grid, `${turnOfComputer ? player2 : player1} Turn!`));
  let input = []

  if (turnOfComputer) {
    delay();
    const offset = 1000;
    const opponenetPointGrid = genPointGrid(grid, player1Icon, offset);

    const computerOffset = 1000;
    const computerPointGrid = genPointGrid(grid, player2Icon, computerOffset);
    const finalPoints = mergeGrid(computerPointGrid, opponenetPointGrid);

    input = getMaxPointLoc(finalPoints);
  } else {
    input = getNonUsedCordInput(grid);
  }

  grid = markGrid(grid, input, turnOfComputer ? player2Icon : player1Icon);

  gameRound(grid, roundsLeft - 1, player1, player1Icon, player2, player2Icon, !turnOfComputer);
}


function takeIconInput(message) {
  const input = prompt(message).trim()
  let isInvalid = typeof +input[1] !== "number" || !(+input <= PLAYER_ICONS.length && +input > 0);

  if (isInvalid) {
    return takeIconInput(message)
  }
  return +input - 1;
}

const PLAYER_ICONS = ["X", "0", "O", "⭐", "❌", "⭕", "✅", "🔴", "🔵", "🔺", "▪️", "🔸", "🚀", "👾", "🎯", "🔑", "🔔", "💎", "💡", "⚙️", "⚡", "🔥", "💯"];
function selectIcon() {

  let lines = ["", "\tNo | Icon"]
  lines.push("\t" + generateArrayLine(lines[1].length, "-", "-", "-").join(""));
  for (let index = 0; index < PLAYER_ICONS.length; index++) {
    lines.push(`\t${(index + 1 + "").padStart(2)} | ${PLAYER_ICONS[index]}`);
  }
  lines.push("")
  console.log(lines.join("\n"));
  return PLAYER_ICONS[takeIconInput("Please Select Your Character Icon : ")]
}

function random(starting = 0, ending = 1) {
  console.log("here");

  return Math.floor(Math.random() * (ending - starting)) + starting;
}

function randomValueFrom(array) {
  console.log("here");

  const index = random(0, array.length);
  return array[index];
}


function playGame() {
  console.clear()
  const player1 = prompt("Enter player 1 :")
  const player1Icon = selectIcon()
  console.clear()
  const player2 = "Computer level - 1"
  const player2Icon = "$"

  let grid = genGridOf(3, 3)
  const isComputerTurn = randomValueFrom([true, false]);

  console.log("isCOmput", isComputerTurn);

  gameRound(grid, 9, player1, player1Icon, player2, player2Icon, isComputerTurn)

  const playAgain = confirm("Wanted to Play Again?")
  if (playAgain) {
    playGame();
  }
}


function play() {
  playGame()
}

play()
