import { delay } from "./visualiser/utility.js";

export const moveLeft = ({ orientation, ...rest }) => {
  return { ...rest, orientation };
};

export const createRover = (data = { x: 0, y: 0, orientation: "E" }) => {
  return data;
};
