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

const genHollowLine = (len, mainChar = " ", st = "*", end = "*") => {
  return (st + mainChar.repeat(Math.max(0, len - 2)) + end).trim(len);
};

const drawLines = (value, style) => {
  return value.map((each) => style(each));
};

const drawPattern = (type, style) => {
  return type
    .map((each, index) => drawLines(each, style[index]))
    .flat()
    .join("\n");
};

const monolyth = (m) => {
  return [m];
};

const sandwitch = (m) => {
  if (m.length === 1) {
    return [[m[0]], [], []];
  }
  if (m.length === 2) {
    return [[m[0]], [], [m[1]]];
  }
  return [[m[0]], m.slice(1, m.length - 1), [m.at(-1)]];
};

const rectangle = (m, n) => {
  const patternLines = monolyth(lineN(m, n));
  const patterStyle = [patternLine];
  return drawPattern(patternLines, patterStyle);
};

const hollowLine = (m, n) => {
  const patternLines = sandwitch(lineN(m, n));
  console.log(patternLines);

  const patternStyle = [patternLine, genHollowLine, patternLine];
  return drawPattern(patternLines, patternStyle);
};

console.log(rectangle(3, 10));
console.log(hollowLine(10, 10));
