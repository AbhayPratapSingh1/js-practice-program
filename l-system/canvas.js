import { chunk } from "./chunk.js";

const configData = await Deno.readTextFile("./canvasConfig.json");
const config = JSON.parse(configData);
const [r, g, b] = [0, 0, 0];
const ICON = `\x1b[48;2;${r};${g};${b}m  \x1b[0m`;
const BG_ICON = `\x1b[48;2;255;255;255m  \x1b[0m`;
const createScreen = (config) => {
  return {
    height: config.height,
    width: config.width,
    pixels: Array.from(
      { length: config.height },
      () => Array.from({ length: config.width }, () => BG_ICON),
    ),
  };
};

const asyncDraw = async (grid, size = 25) => {
  const parts = chunk(grid, size);
  for (const part of parts) {
    await setTimeout(() => {
      console.log(part.map((row) => row.join("")).join("\n"));
    }, 500);
  }
};

const displayScreen = (screen) => {
  if (screen.height > 100 && screen.width > 100) {
    asyncDraw(screen.pixels);
  } else {
    console.log(screen.pixels.map((row) => row.join("")).join("\n"));
  }
};

const isBetween = (start, val, end) => val > start && val < end;

const plotPoint = (x, y, screen, icon) => {
  const acX = Math.round(x);
  const acY = Math.round(y);

  if (isBetween(-1, acX, screen.width) && isBetween(-1, acY, screen.height)) {
    screen.pixels[acY][acX] = icon;
  }
};

const line = (p1, p2, screen, icon = ICON) => {
  const deltaX = Math.abs(p2.x - p1.x);
  const deltaY = Math.abs(p2.y - p1.y);

  const largerKey = deltaX > deltaY ? "x" : "y";

  const jumps = Math.abs(p2[largerKey] - p1[largerKey]);

  const dx = (p2.x - p1.x) / jumps;
  const dy = (p2.y - p1.y) / jumps;

  let x = p1.x;
  let y = p1.y;

  for (let jump = 0; jump <= jumps; jump++) {
    plotPoint(x, y, screen, icon);
    x += dx;
    y += dy;
  }
};

const toRadian = (degree) => {
  return (Math.PI / 180) * degree;
};

const polygon = (center, diagonal, sides, offset = 0) => {
  const dAngle = 360 / sides;
  const points = [];
  for (let index = 0; index < sides; index++) {
    const angle = toRadian((dAngle * index) + offset);
    const x = Math.round(Math.cos(angle) * diagonal) + center.x;
    const y = Math.round(Math.sin(angle) * diagonal) + center.y;
    points.push({ x, y });
  }
  return points;
};

const circle = (center, radius, screen) => {
  const points = polygon(center, radius, radius);

  for (let index = 0; index < points.length - 1; index++) {
    line(points[index], points[index + 1], screen);
  }

  line(points[0], points.at(-1), screen);
};

const screen = createScreen(config);

const center = { x: config.width / 2, y: config.height / 2 };
const radiuses = [
  (config.width / 2) - 10,
  (config.width / 3) - 10,
  (config.width / 4) - 10,
  (config.width / 5) - 10,
];

for (const radius of radiuses) {
  circle(center, radius, screen);
}

displayScreen(screen);
