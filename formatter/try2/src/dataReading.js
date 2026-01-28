let _unformatedData;
try {
  _unformatedData = Deno.readTextFileSync("../data/input.txt");
} catch {
  try {
    _unformatedData = Deno.readTextFileSync("./data/input.txt");
  } catch {
    console.log("Unable top read File");
  }
}
export const unformatedData = _unformatedData;
