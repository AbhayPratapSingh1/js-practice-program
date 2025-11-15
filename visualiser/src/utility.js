export const generateRandomInt = (start = 1, end = 100) => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export const randomInRange = (count, start = 1, end = 100) => {
  return Array.from({ length: count }, () => generateRandomInt(start, end));
};

export const delay = (count = 1) => {
  for (let index = 0; index < count * 10e7; index++) {
    // for (let index2 = 0; index2 < 10e4;index++)
    // const element = array[index];
  }
};

export const deepCopy = (data) => {
  if (Array.isArray(data)) {
    return data.map((each) => deepCopy(each));
  }
  if (data === null) {
    return null;
  }
  if (typeof data === "object") {
    return Object.entries(data).reduce(
      (copyObject, [key, value]) =>
        (copyObject[key] = deepCopy(value)) && copyObject,
      {},
    );
  }
  return data;
};
