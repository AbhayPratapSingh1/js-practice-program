const writeFile = (data) => {
  Deno.writeTextFileSync("./inputBuffer.txt", data);
};

while (true) {
  const data = prompt(">>");
  writeFile(data);
}
