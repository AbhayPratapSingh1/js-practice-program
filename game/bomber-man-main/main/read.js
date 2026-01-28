export const readAndClearFile = () => {
  const data = Deno.readTextFileSync("./inputBuffer.txt");
  Deno.writeTextFileSync("./inputBuffer.txt", "");
  return data;
};

// setInterval(() => {
//   console.log(readAndClearFile());
// }, 200);
