export const readFileData = (name) => {
  try {
    return Deno.readTextFileSync(`./data/${name}`);
  } catch {
    return Deno.readTextFileSync(`./test/data/${name}`);
  }
};
