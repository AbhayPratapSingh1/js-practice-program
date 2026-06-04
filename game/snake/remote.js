const writeData = (data) => {
  Deno.writeTextFileSync("./src/inputBuffer.txt", data);
};

while (true) {
  const data = prompt(">>");
  writeData(data);
}
