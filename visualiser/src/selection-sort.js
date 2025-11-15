import { deepCopy, delay, randomInRange } from "./utility.js";

const visualGrid = (data, char = "*") =>
  data.map((each) => char.repeat(each).split(""));

const formatGrid = (data, printableData) => {
  console.log();

  const newGrid = Array.from(
    { length: data.length },
    () => " ".repeat(Math.max(...data)).split(""),
  );
};

const visualiser = (data, selected, swaping, isSwapping = false) => {
  const barWithWeight = visualGrid(data, "🟫");
  barWithWeight[selected] = barWithWeight[selected] = "🟩".repeat(
    data[selected],
  ).split("");
  barWithWeight[swaping] = barWithWeight[swaping] = "🟦".repeat(
    data[swaping],
  ).split("");

  if (isSwapping) {
    delay(0.1);
    const printable = barWithWeight.map((each) => each.join("")).join("\n");
    console.clear();
    console.log(printable);
    barWithWeight[swaping] = barWithWeight[swaping] = "🟥".repeat(
      data[swaping],
    ).split("");
  }

  const printable = barWithWeight.map((each) => each.join("")).join("\n");
  delay(0.1);
  console.clear();

  console.log(printable);
  formatGrid(data, barWithWeight);
};

export const seletionSort = (data) => {
  const sortingData = deepCopy(data);
  for (let r = 0; r < sortingData.length; r++) {
    for (let c = r + 1; c < sortingData.length; c++) {
      let isSwapping = sortingData[r] > sortingData[c];
      visualiser(sortingData, r, c, isSwapping);
      if (isSwapping) {
        isSwapping = true;
        const valueHolder = sortingData[c];
        sortingData[c] = sortingData[r];
        sortingData[r] = valueHolder;
      }
    }
  }
  visualiser(sortingData, sortingData.length - 1, sortingData.length - 1);

  return sortingData;
};

// console.log(seletionSort([9, 7, 4, 3, 5, 4, 5]));

console.log(seletionSort(randomInRange(100, 1, 100)));
