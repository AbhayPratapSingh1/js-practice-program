export const dbg = (x, message = "", wait = false) => {
  console.log(JSON.stringify(`${x}`), "\t<--", message);

  wait && prompt("");
  return x;
};
