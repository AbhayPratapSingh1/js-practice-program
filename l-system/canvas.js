import { createScreen, displayScreen } from "./drawScreen.js";
import { arc, circle, pieceOfCake } from "./shapes.js";

const configData = await Deno.readTextFile("./canvasConfig.json");
const config = JSON.parse(configData);

const screen = createScreen(config);

const center = { x: config.width / 2, y: config.height / 2 };

const createEye = (screen, x, dy = 0, radius = 120) => {
  const diff = Math.sqrt(3) * radius / 2;

  const c1 = { x, y: dy + (config.height / 2) - diff };
  const c2 = { x, y: dy + (config.height / 2) + diff };

  const pC1 = { y: dy + (config.height / 2), x };

  const pupilRadius = radius - diff - 1;
  circle(pC1, pupilRadius, screen);
  arc(c1, 60, 120, radius, screen, false);
  arc(c2, 240, 300, radius, screen, false);
};

createEye(screen, screen.width / 4, -50);
createEye(screen, 3 * (screen.width / 4), -50);

displayScreen(screen);
