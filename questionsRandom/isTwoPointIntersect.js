const isNearlyEqual = (a, b) => {
  const delta = a - b;
  return delta < 0.0001 && delta > -0.0001;
};
const isIntersect = (pair1, pair2) => {
  const p1 = pair1.p1;
  const p2 = pair1.p2;
  const p21 = pair2.p2;
  const p22 = pair2.p2;

  const slope1 = (p1.x - p2.x) / (p1.y - p2.y);
  const slope2 = (p21.x - p22.x) / (p21.y - p22.y);
  return slope1 + slope2 !== 0;
  // return isSameSlope;
};

const pair1 = {
  p1: { x: 1, y: 0 },
  p2: { x: 3, y: 0 },
};
const pair2 = {
  p1: { x: 1, y: 1 },
  p2: { x: 3, y: 1 },
};
