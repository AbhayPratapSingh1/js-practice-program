import { snakeAnimation } from "./src/snake.js";

snakeAnimation({
  x: 0,
  y: 0,
  dx: 1,
  dy: 0,
  length: 1,
  locations: [],
  icon: "X",
  tailIcon: "-",
  direction: "S",
});
