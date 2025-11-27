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

const extractWord = (data, regex) => {
  const rejectData = [...data.matchAll(regex)];
  return rejectData.map((each) => each[0]);
};

const getAllLetDeclaredVariable = (data) => {
  const letsRegex = /let\s*([^\s=;\n]+)\s*/g;
  const letMatches = [...data.matchAll(letsRegex)];
  return letMatches.map((each) => each[1]);
};

const varUpdateFrequency = (data, letVars) => {
  const eachFrequency = {};
  for (const eachVar of letVars) {
    const assignMatch = new RegExp(`${eachVar}\\s*=`, "g");
    const assigns = data.matchAll(assignMatch);
    eachFrequency[eachVar] = [...assigns].length;
  }

  return eachFrequency;
};

const changeToConst = (data, variable) => {
  const regex = new RegExp(`let (${variable})`);
  return data.replace(regex, `const $1`);
};

const replaceUnusedLet = (data) => {
  const letVars = getAllLetDeclaredVariable(data);

  const frequency = varUpdateFrequency(data, letVars);
  const nonUpdateVar = Object.entries(frequency).filter((each) => each[1] === 1)
    .map((each) => each[0]);

  let newData = data;
  for (const variable of nonUpdateVar) {
    newData = changeToConst(newData, variable);
  }
  return newData;
};

const main = () => {
  const sampleData = readFile("./sample.js");
  const modifiedData = replaceUnusedLet(sampleData);
  storeFile(modifiedData, "./out.js");
};

main();
