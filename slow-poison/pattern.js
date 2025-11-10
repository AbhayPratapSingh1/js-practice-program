const lineNofM = (n, m = 1) => {
  const array = [];
  for (let index = 0; index < n; index++) {
    array.push(m);
  }
  return array;
};

const lineNwithInc = (n) => {
  const array = [];
  for (let index = 0; index < n; index++) {
    array.push(index + 1);
  }
  return array;
};

const charLine = (len, mainChar = "*") => {
  return mainChar.repeat(len);
};

const hollowLine = (len, mainChar = " ", st = "*", end = "*") => {
  return (st + mainChar.repeat(Math.max(0, len - 2)) + end).slice(0, len);
};

const drawLines = (value, style) => {
  return value.map((each) => style(each));
};

const monolyth = (m) => {
  return [m];
};

const sandwitchType = (m) => {
  if (m.length === 1) {
    return [[m[0]], [], []];
  }
  if (m.length === 2) {
    return [[m[0]], [], [m[1]]];
  }
  return [[m[0]], m.slice(1, m.length - 1), [m.at(-1)]];
};

const drawPattern = (type, style) => {
  const design = []
  for (let index = 0; index < type.length; index++) {
    const eachDesignLine = type[index]
    design.push(drawLines(eachDesignLine, style[index]))
  }

  return design;
};

const drawPatterns = (m, n, linesType, patternType, style) => {
  const template = patternType(linesType(m, n));

  return drawPattern(template, style).flat().join("\n");
};

const rectangle = (m, n) => {
  return drawPatterns(m, n, lineNofM, monolyth, [charLine]);
};

const hollowRectangle = (m, n) => {
  return drawPatterns(m, n, lineNofM, sandwitchType, [
    charLine,
    hollowLine,
    charLine,
  ]);
};

const triangle = (n, m) => {
  return drawPatterns(n, m, lineNwithInc, monolyth, [charLine]);
};

const hollowTriangle = (n, m) => {
  return drawPatterns(n, m, lineNwithInc, sandwitchType, [
    charLine,
    hollowLine,
    charLine,
  ]);
};

console.log(rectangle(10, 10));
console.log();

console.log(hollowRectangle(10, 10));
console.log();

console.log(triangle(10, 10));
console.log();

console.log(hollowTriangle(10, 10));
console.log();
