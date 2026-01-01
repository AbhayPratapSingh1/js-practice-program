class MyPromise {
  constructor(callback) {
    this.isResolved = false;
    this.val = null;

    this.toExecute = (val) => {
      this.isResolved = true;
      this.val = val;
    };

    callback(this.resolve, this.reject);
  }

  resolve = (val) => {
    console.log("Value Resolved");
    // resolve the value here
    this.toExecute(val);
  };

  reject = (val) => {
    console.log("Value Rejected");

    // threw the error here
    this.toExecute(val);
  };

  then = (callback) => {
    if (this.isResolved) {
      return new MyPromise((resolve, reject) => {
        resolve(val);
        callback(this.val);
      });
    } else {
      const prev = this.toExecute;
      const newCall = (resolve, reject) => {
        const newToExec = (val) => {
          prev(val);
          this.val = callback(this.val);
          resolve(this.val);
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
