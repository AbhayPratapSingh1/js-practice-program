class MyPromise {
  constructor(callback) {
    this.callback = callback;
    this.isResolved = false;
    this.resolvedValue = null;

    this.toExecute = (resolvedValue) => {
      this.isResolved = true;
      this.resolvedValue = resolvedValue;
    };

    this.callback(this.resolve, this.reject);
  }

  resolve = (val) => {
    this.toExecute(val);
  };

  reject = (val) => {
    this.toExecute(val);
  };

  resolveNewCallbackValues = (callback, resolve, reject) => {
    const resolvedValue = callback(this.resolvedValue);
    if (!(resolvedValue instanceof MyPromise)) {
      resolve(resolvedValue);
      return;
    }
    const id = setInterval(() => {
      if (resolvedValue.isResolved) {
        resolve(resolvedValue.resolvedValue);
        clearInterval(id);
      }
    }, 200);
  };

  then = (callback) => {
    let newCallback = null;

    if (this.isResolved) {
      newCallback = (resolve, reject) => {
        this.resolveNewCallbackValues(callback, resolve, reject);
      };
    } else {
      const prev = this.toExecute;

      newCallback = (resolve, reject) => {
        const newToExec = (val) => {
          prev(val);
          this.resolveNewCallbackValues(callback, resolve, reject);
        };
        this.toExecute = newToExec;
      };
    }

    return new MyPromise(newCallback);
  };
}

new MyPromise((resolve) => {
  console.log("IN P1 (Before)");
  setTimeout(() => {
    resolve(1);
  }, 2000);
  console.log("IN P1 (After)");
}, 1).then((x) => {
  console.log("new ", { x });
  return x + 1;
}).then((x) => {
  console.log("new2 ", { x });
  return x + 1;
}).then((x) => {
  console.log("new3 ", { x });
  return x + 1;
}).then((x) => {
  console.log("new4 ", { x });
  return new MyPromise((resolve) => {
    setTimeout(() => {
      console.log("2nd promise is resolved");
      resolve(100);
    }, 2000);
  });
}).then((x) => {
  console.log("new5 ", { x });
  return x + 1;
}).then((x) => {
  console.log("new6 ", { x });
  return x + 1;
}).then((x) => {
  console.log("Final ", x);
});
