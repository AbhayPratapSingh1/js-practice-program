import { ITERABLE } from "./iterable-config.js";

export const isIterable = (value) => {
  return ITERABLE.symbol_id === value;
};
