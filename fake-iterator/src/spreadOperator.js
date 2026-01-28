import { ITERABLE } from "./iterable-config.js";
import { isIterable } from "./iterable.js";

const obj = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        if (i < 10) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (i === 5) {
                reject({ value: i++, done: false });
              } else {
                resolve({ value: i++, done: false });
              }
            }, 2000);
          }).catch((x) => {
            console.log(x);
            return x;
          });
        }
        return { done: true, value: "Asdf" };
      },
    };
  },
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        if (i < 10) {
          return { value: i++, done: true };
        }
        return { done: true, value: "Asdf" };
      },
    };
  },
};

obj[Symbol.iterator]();

// [...obj]
// 1. check iterator
// 2. callit
// 3. stores it
// 4. do sotred.next() ==> until done === true

// Symbol.iterator = "THIS IS ITR";

export const spreadOperator = (iterator) => {
  if (isIterable(iterator)) {
    throw ("Invalid Iterator");
  }

  const it = iterator[ITERABLE.symbol_id]();
  let newNext = it.next();

  if (newNext.done) {
    return [];
  }

  const values = [];

  while (!newNext.done) {
    values.push(newNext.value);
    newNext = it.next();
  }
  return values;
};
