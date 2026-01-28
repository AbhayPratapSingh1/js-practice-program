export const randomNo = (start = 1, end = 100) => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export const randomInRange = (count, start = 1, end = 100) => {
  return Array.from({ length: count }, () => randomNo(start, end));
};
