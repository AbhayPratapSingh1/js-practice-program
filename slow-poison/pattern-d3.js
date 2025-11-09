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

function sum(each) {
  return each.reduce((count, each) => count + each, 0);
}

const patternLineStyle = (type, style) => {
  const line = type
    .map((each, index) => charLine(sum(each), style[index]))
    .flat()
    .join("");

  return line;
};

const charLine = (len, mainChar = "*") => {
  return mainChar.repeat(len);
};

const hollowLine = (len, mainChar = " ", st = "*", end = "*") => {
  return (st + mainChar.repeat(Math.max(0, len - 2)) + end).slice(0, len);
};

const drawLines = (value, style) => {
  return value
    .map((eachLine, index) => patternLineStyle(eachLine, style))
    .flat();
};

const drawPattern = (type, style) => {
  return type.map((each, index) => drawLines(each, style[index]));
};

const drawPatterns = (m, n, linesType, patternType, style) => {
  const template = patternType(linesType(m, n));
  return drawPattern(template, style).flat().join("\n");
};

const rectPatStyle = ["|", "_", "\\"];
const dashStyle = ["|", " ", "\\"];
const sandWichMonolyth = (lines) => {
  const newLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lineNofM(lines[index], 1);
    newLines.push(sandwitchType(line));
  }
  return monolyth(newLines);
};

const sandwitchOfSandwitch = (lines) => {
  const newLines = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lineNofM(lines[index], 1);
    newLines.push(sandwitchType(line));
  }
  return sandwitchType(newLines);
};

const rectangle = (m, n) => {
  return drawPatterns(m, n, lineNofM, sandWichMonolyth, [rectPatStyle]);
};
const triangle = (m, n) => {
  return drawPatterns(m, n, lineNwithInc, sandWichMonolyth, [rectPatStyle]);
};
const complexRect = (m, n) => {
  return drawPatterns(m, n, lineNwithInc, sandwitchOfSandwitch, [
    rectPatStyle,
    dashStyle,
    rectPatStyle,
  ]);
};

const complexStruct = (m, n) => {
  return drawPatterns(m, n, lineNofM, sandwitchOfSandwitch, [
    rectPatStyle,
    dashStyle,
    rectPatStyle,
  ]);
};

console.log(rectangle(10, 10));
console.log();

console.log(triangle(10, 10));
console.log();
console.log(complexRect(10, 10));
console.log();

console.log(complexStruct(10, 20));
console.log();
