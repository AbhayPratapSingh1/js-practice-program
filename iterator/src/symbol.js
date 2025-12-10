import { ITERABLE } from "./iterable-config.js";

const idCode = 1000; // THIS SHOULD BE SOMTHING HAD TO MAKE KEY
const REGISTRY = {};

// REGISTRY FOR THE ITERATOR
REGISTRY[ITERABLE.name] = ITERABLE.symbol_id;

export const _SYMBOL = {
  iterator: ITERABLE.name,
};

export const SYMBOL = (item) => {
  if (REGISTRY[item] === undefined) {
    REGISTRY[item] = idCode++;
  }
  return REGISTRY[item];
};
