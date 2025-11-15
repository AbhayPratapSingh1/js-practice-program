import { deepCopy, randomInRange } from "./utility.js";
import { visualiser } from "./visualiser.js";

export const seletionSort = (data, style = "tw") => {
  const sortingData = deepCopy(data);
  for (let r = 0; r < sortingData.length; r++) {
    for (let c = r + 1; c < sortingData.length; c++) {
      const isSwapping = sortingData[r] > sortingData[c];
      visualiser(sortingData, r, c, isSwapping, style, 1);
      if (isSwapping) {
        [sortingData[c], sortingData[r]] = [sortingData[r], sortingData[c]];
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

// console.log(seletionSort([9, 7, 4, 3, 5, 4, 5]));

console.log(seletionSort(randomInRange(40, 1, 100)));
