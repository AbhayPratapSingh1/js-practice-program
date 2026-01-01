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
    console.log("Value Resolved");
    this.toExecute(val);
  };

  reject = (val) => {
    console.log("Value Rejected");
    this.toExecute(val);
  };

  then = (callback) => {
    if (this.isResolved) {
      return new MyPromise((resolve, reject) => {
        resolve(val);
        callback(this.resolvedValue);
      });
    } else {
      console.log("needed to be resolved");

      const prev = this.toExecute;
      const newCall = (resolve, reject) => {
        const newToExec = (val) => {
          prev(val);
          this.resolvedValue = callback(this.resolvedValue);
          resolve(this.resolvedValue);
        };
        this.toExecute = newToExec;
      };

      return new MyPromise(newCall);
    }
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
});
