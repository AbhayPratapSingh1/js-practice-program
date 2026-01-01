import { line, toRadian } from "./shapes.js";

const createBlock = ([r, g, b]) => {
  return `\x1b[48;2;${r};${g};${b}m  \x1b[0m`;
};
export class Turtle {
  constructor(x, y, screen, angle = 270, color = [0, 0, 0]) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.screen = screen;
    this.color = color;
    this.tile = createBlock(this.color);
  }
  move(steps) {
    const angle = toRadian(this.angle);
    const dx = Math.cos(angle) * steps;
    const dy = Math.sin(angle) * steps;

    const prev = { x: this.x, y: this.y };

    this.x += dx;
    this.y += dy;

    line(prev, { x: this.x, y: this.y }, this.screen, this.tile);
  }
  rotate(angle, clockWise = true) {
    if (clockWise) {
      this.angle += angle;
      return;
    }
    this.angle -= angle;
  }
}
