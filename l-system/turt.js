import { Turtle } from "./src/canvas.js";
import { createScreen, displayScreen } from "./src/drawScreen.js";

const screen = createScreen({ height: 20, width: 20 });
const turtle = new Turtle(10, 10, screen, 270);

turtle.move(10);
turtle.rotate(135, true);
turtle.move(5);

turtle.move(5);
screen.pixels[Math.round(turtle.y)][Math.round(turtle.x)] = "XX";
displayScreen(screen);
