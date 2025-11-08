const lineN = (n, m = 1) => {
  const array = [];
  for (let index = 0; index < n; index++) {
    array.push(m);
  }
  return array;
};

const patternLine = (len, mainChar = "*", st = "*", end = "*") => {
  return (st + mainChar.repeat(Math.max(0, len - 2)) + end).trim(len);
};

const hollowLine = (len, mainChar = " ", st = "*", end = "*") => {
  return (st + mainChar.repeat(Math.max(0, len - 2)) + end).trim(len);
};

const draw = (design) => {
  return design.map((each) => hollowLine(each));
};

const rectangle = (m, n) => {
  return lineN(m, n)
    .map((each) => patternLine(each, " *", " *", " *"))
    .join("\n");
};
console.log(rectangle(10, 10));
