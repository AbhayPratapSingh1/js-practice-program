const HEIGHT = 60;
const WIDTH = 60;
// const HEXAGON_SIDE = WIDTH / 3;

// const BLACK = "⬛️";
// const WHITE = "X";
const icon = "-";
const screen = {
  height: HEIGHT,
  width: WIDTH,
  pixels: Array.from(
    { length: HEIGHT },
    () => Array.from({ length: WIDTH }, () => " "),
  ),
};

// const drawHexagon = (screen) => {
//   console.clear();
//   const pixel = screen.pixels;

//   // top and last row
//   const start = (screen.width - HEXAGON_SIDE) / 2;
//   const end = (screen.width + HEXAGON_SIDE) / 2;
//   for (let col = start; col < end; col++) {
//     pixel[0][col] = WHITE + WHITE;
//     pixel[screen.height - 1][col] = WHITE + WHITE;
//   }

//   // for the top part
//   const height = Math.floor((Math.sqrt(3) * HEXAGON_SIDE) / 2);
//   const offset = 0;

//   for (let row = offset; row < height + offset; row++) {
//     pixel[row][start - (row - offset)] = WHITE;
//     pixel[row][end + (row - offset - 1)] = WHITE;
//   }

//   // for the opposite side
//   for (let row = height + offset; row < 2 * height + offset; row++) {
//     const rowCount = 2 * height + offset - row;
//     pixel[row][start - (rowCount - offset)] = WHITE;
//     pixel[row][end + (rowCount - offset - 1)] = WHITE;
//   }
// };

const nearlyEqual = (val1, val2) =>
  val1 - val2 < 0.00000001 && val1 - val2 > -0.00000001;

const isInLine = (p1, p2, p3) => {
  const sameSlope = nearlyEqual(
    Math.atan2(p2.y - p1.y, p2.x - p1.x),
    Math.atan2(p3.y - p1.y, p3.x - p1.x),
  );
  if (!sameSlope) {
    return false;
  }

  const isXinBound = Math.min(p1.x, p2.x) <= p3.x &&
    p3.x <= Math.max(p1.x, p2.x);
  const isYinBound = Math.min(p1.y, p2.y) <= p3.y &&
    p3.y <= Math.max(p1.y, p2.y);
  return isXinBound && isYinBound;
};

const drawHexagon = (screen) => {
  const pointsPair = {
    p1: { x: 0, y: 0 },
    p2: { x: 10, y: 10 },
  };

  const slope = (pointsPair.p2.y - pointsPair.p1.y) /
    (pointsPair.p2.x - pointsPair.p1.x);

  for (let row = 0; row < screen.width; row++) {
    for (let col = 0; col < screen.width; col++) {
      if (getSlope({})) {
      }
    }
  }

  console.log(slope);
};

drawHexagon(screen);
// for (const row of screen.pixels){
//   for(let index = 0; index < row.length; index++){
//     if ()
//   }
// }
// console.log(screen.pixels.map((each) => each.join("")).join("\n"));
