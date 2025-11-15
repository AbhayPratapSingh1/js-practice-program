import { deepCopy, randomInRange } from "./utility.js";
import { visualiser } from "./visualiser.js";

export const bubbleSort = (data, style = "tw") => {
  const sortingData = deepCopy(data);
  for (let r = 0; r < sortingData.length; r++) {
    for (let c = 1; c < sortingData.length - r; c++) {
      const isSwapping = sortingData[c] < sortingData[c - 1];
      visualiser(sortingData, c - 1, c, isSwapping, style, 1);
      if (isSwapping) {
        [sortingData[c], sortingData[c - 1]] = [
          sortingData[c - 1],
          sortingData[c],
        ];
      }
    }
  }
  visualiser(
    sortingData,
    sortingData.length - 1,
    sortingData.length - 1,
    false,
    style,
  );

  return sortingData;
};

console.log(bubbleSort(randomInRange(20, 1, 50)));
