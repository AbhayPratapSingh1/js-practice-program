const generator = () => {
  let i = 0;

  return {
    next() {
      return { done: false, value: i++ };
    },
    [Symbol.iterator]() {
      return this;
    },
    take(n) {
      let c = 0;
      const prevNext = this.next;

      const newNext = (...args) => {
        return c++ < n ? prevNext(...args) : { done: true };
      };

      this.next = newNext;
      return this;
    },

    map(fn) {
      const prevNext = this.next;

      const newNext = (...args) => {
        const newVal = prevNext(...args);
        if (!newVal.done) {
          return { value: fn(newVal.value), done: false };
        }
        return newVal;
      };

      this.next = newNext;
      return this;
    },

    filter(fn) {
      const prevNext = this.next;

      const newNext = (...args) => {
        const newVal = prevNext(...args);
        if (!newVal.done) {
          return fn(newVal.value) ? newVal : newNext(...args);
        }

        return newVal;
      };

      this.next = newNext;
      return this;
    },
  };
};

const itr = generator();

[...itr.filter((x) => x % 2 === 0).take(5)];
