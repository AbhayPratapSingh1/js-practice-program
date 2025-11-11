const genCORD = () => {
  const newObject = {};

  newObject.isEven = () => {
    const k = newObject.n;
    return k % 2 === 0;
  };

  return newObject;
};

const cord1 = genCORD();
console.log(cord1);
// console.log(cord1.isEven());
// cord1.n = 10;
// console.log(cord1.isEven());
// cord1.n = 11;
// console.log(cord1.isEven);

// cord1.n = 9;
// console.log(cord1);

// const cord2 = genCORD();
// cord2.n = 10;

// console.log("for cord 1 =", cord1.isEven());
// console.log("for cord 2 =", cord2.isEven());
// const a = 100;
