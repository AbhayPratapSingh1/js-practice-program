const encoder = new TextEncoder();
const decoder = new TextDecoder();

const getDataHandler = () => {
  let data = new Uint8Array();
  let count = 0;
  return {
    toUpdate: () => count !== data.length,
    makeUptoDate: () => count = data.length,
    updateData: (input) => {
      let newInputs = input;

      if (newInputs[0] === 13 && newInputs.length === 1) {
        newInputs = new Uint8Array([10]);
      }
      
      if (newInputs[0] === 127 && newInputs.length === 1) {
        data = data.slice(0, data.length - 1);
        return;
      }

      const buffer = new Uint8Array(newInputs.length + data.length);
      buffer.set(data);
      buffer.set(newInputs, data.length);
      data = buffer;
    },
    getData: () => data.slice(0),
  };
};

const delay = async (time) => {
  await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, time);
  });
};

const getTime = (time) => {
  const message = ` TIME : ${Math.floor(time / 1000)}\n`;
  return encoder.encode(message);
};

const renderUi = async (dataHandler) => {
  let time = 0;
  while (true) {
    if (dataHandler.toUpdate() || time % 1000 === 0) {
      console.clear();
      dataHandler.makeUptoDate();
      const formatedTime = getTime(time);
      const dataToShow = dataHandler.getData();

      Deno.stdout.write(formatedTime);
      Deno.stdout.write(dataToShow);
    }

    await delay(100);

    time += 100;
  }
};

const takeInput = async (stdin, dataHandler) => {
  for await (const char of stdin) {
    dataHandler.updateData(char);
  }
};

const main = () => {
  const dataHandler = getDataHandler();
  const stdIn = Deno.stdin.readable;
  Deno.stdin.setRaw(true, { cbreak: true });

  takeInput(stdIn, dataHandler);
  renderUi(dataHandler);
};

main();
