import { spreadOperator } from "./spreadOperator.js";
import { _SYMBOL, SYMBOL } from "./symbol.js";

const DEFAULT = (a, b) => a > b;

const createIterator = (from = 10, to = -1, st = -1, predicate) => {
  predicate = predicate || DEFAULT;

  let lastValue = from;

  return {
    next: () => {
      return predicate(lastValue, to)
        ? { done: false, value: lastValue += st }
        :  { done: true };
    },

    [SYMBOL(_SYMBOL.iterator)]: function () {
      return this;
    },
  };
};



const myItrIncrement = createIterator(5, 15, 1, (i, end) => i < end);
const myItrDecrement = createIterator(15, 5, -1, (i, end) => i > end);
const emptyRange = createIterator(15, 15, -1, (i, end) => i > end);

console.log(spreadOperator(emptyRange));
console.log(spreadOperator(myItrIncrement));
console.log(spreadOperator(myItrDecrement));
