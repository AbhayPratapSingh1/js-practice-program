const readFile = (path) => {
  if (path === "") {
    console.log("Invalid Path");
    return "";
  }
  return Deno.readTextFileSync(path);
};

const storeFile = (data, path) => {
  Deno.writeTextFileSync(path, data);
};

const replaceFunctionToArrowFunction = (data) => {
  let newData = data;
  while (newData.includes("function")) {
    newData = newData.replace(
      /function\s(\w+)\s*\(([^\)]*)\)\s*{/g,
      "const $1 = ($2) => { ",
    );
  }
  return newData;
};

const main = () => {
  const sampleData = readFile("./sampleTest.js");
  const modifiedData = replaceFunctionToArrowFunction(sampleData);
  storeFile(modifiedData, "./out.js");
};
main();
