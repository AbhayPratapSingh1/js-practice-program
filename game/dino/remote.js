const writeInstruction = (data) => {
  Deno.writeTextFileSync("inputBuffer.txt", data);
};

while (true) {
  prompt("Enter to jump...");
  writeInstruction("j");
}
