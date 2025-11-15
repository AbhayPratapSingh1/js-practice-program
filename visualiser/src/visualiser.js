import { delay } from "./utility.js";
import { dbg } from "./utility.js";

const showPattern = (data) => {
  const icon = {
    "A": "🟫",
    "S": "🟥",
    "D": "🟩",
    "R": "🟦",
    " ": "  ",
  };

  const designedData = data.map((
    each,
  ) => each.map((every) => icon[every]));
  console.log(designedData.map((each) => each.join("")).join("\n"));
};

const transpose = (printableData) => {
  const xMax = printableData.length;
  const yMax = printableData[0].length;
  const data = Array.from({ length: yMax }, () => " ".repeat(xMax).split(""));

  printableData.map((each, x) =>
    each.map((_, y) => data[y][x] = printableData[x][y])
  );
  return data;
};

const waterImage = (printableData) => {
  const data = printableData.toReversed();

  return data;
};

const mirrorImage = (printableData) => {
  const data = printableData.map((each) => each.toReversed());

  return data;
};

const formatableTemplate = (data, printableData) => {
  const maxRowLen = Math.max(...data);
  const template = Array.from(
    { length: data.length },
    () => " ".repeat(maxRowLen).split(""),
  );
  data.map((each, x) =>
    " ".repeat(each).split("").map((_, y) =>
      template[x][y] = printableData[x][y]
    )
  );
  return template;
};

const formatGrid = (data, printableData, type) => {
  let formatedData = formatableTemplate(data, printableData);

  const transfomation = {
    "w": waterImage,
    "m": mirrorImage,
    "t": transpose,
  };
  for (let index = 0; index < type.length; index++) {
    if (Object.keys(transfomation).includes(type[index])) {
      formatedData = transfomation[type[index]](formatedData);
    }
  }
  return formatedData;
};

const visualGrid = (data, char = "*") =>
  data.map((each) => char.repeat(each).split(""));

export const visualiser = (
  data,
  selected,
  swap,
  isSwapping = false,
  type = "l",
  time = 3,
) => {
  const barWeight = visualGrid(data, "A");

  barWeight[selected] = barWeight[selected] = "S".repeat(data[selected]).split(
    "",
  );

  barWeight[swap] = barWeight[swap] = "D".repeat(
    data[swap],
  ).split("");

  if (isSwapping) {
    delay(time);
    console.clear();
    showPattern(formatGrid(data, barWeight, type));
    barWeight[swap] = barWeight[swap] = "R".repeat(
      data[swap],
    ).split("");
  }

  delay(time);
  console.clear();
  const formatedGrid = formatGrid(data, barWeight, type);
  showPattern(formatedGrid);
};
