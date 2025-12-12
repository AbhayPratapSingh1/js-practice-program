const randomBetween01 = () => {
  return Math.random();
};

const randomBetween0n = (n = 10) => {
  return Math.floor(Math.random() * n);
};

const randomBetweennm = (n = 10, m = 20) => {
  return (Math.floor(Math.random() * (m - n))) + n;
};

const randomSquareBetween01 = () => {
  return [randomBetween01(), randomBetween01()];
};

const randomSquareBetween0n = (n = 10) => {
  return [randomBetween0n(n), randomBetween0n(n)];
};

const randomSquareBetweennm = (n = 10, m = 20) => {
  return [randomBetweennm(n, m), randomBetweennm(n, m)];
};

const randomSquareBetweennmop = (n = 10, m = 20, o = 20, p = 30) => {
  return [randomBetweennm(n, o), randomBetweennm(m, p)];
};

const randomCubeBetween01 = () => {
  return [randomBetween01(), randomBetween01(), randomBetween01()];
};

const randomCubeBetween0n = (n = 10) => {
  return [randomBetween0n(n), randomBetween0n(n), randomBetween0n(n)];
};

const randomCubeBetweennm = (n = 10, m = 20) => {
  return [randomBetweennm(n, m), randomBetweennm(n, m), randomBetweennm(n, m)];
};

const randomCubeBetweennmopqr = (
  n = 10,
  m = 20,
  o = 30,
  p = 15,
  q = 25,
  r = 35,
) => {
  return [randomBetweennm(n, p), randomBetweennm(m, q), randomBetweennm(o, r)];
};

// topleft, topright, bottomRight, bottomLeft
const randomParallelogram = (x1, y1, x2, y2, x3, x3, y4, y4) => {
};
