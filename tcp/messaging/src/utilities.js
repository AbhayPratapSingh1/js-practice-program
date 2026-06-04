export const readTextFile = (path) => {
  try {
    console.log(path);
    const data = Deno.readTextFileSync(path);

    return { isError: false, data };
  } catch {
    return { isError: true, data: "File Not Found" };
  }
};
