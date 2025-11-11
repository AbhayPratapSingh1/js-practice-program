export const dbg = (x) => {
  console.log(JSON.stringify(`${x}`));
  prompt("");
  return x;
};
