new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("P1");
    resolve(10);
  }, 1000);
}).then((val) => {
  console.log("P2", val);

  return new Promise((resolve) => {
    console.log("Setting p2");

    setTimeout(() => {
      console.log("2");
      resolve(20);
    }, 2000);
  });
}).then((val) => {
  console.log("final ", val);
});
