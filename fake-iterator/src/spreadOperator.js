import { ITERABLE } from "./iterable-config.js";
import { isIterable } from "./iterable.js";

export const spreadOperator = (iterator) => {
  if (isIterable(iterator)) {
    throw ("Invalid Iterator");
  }

  let newNext = iterator[ITERABLE.symbol_id]().next();

  if (newNext.done) {
    return [];
  }

  const values = [];

  while (!newNext.done) {
    values.push(newNext.value);
    newNext = iterator[ITERABLE.symbol_id]().next();
  }
  return values;
};
