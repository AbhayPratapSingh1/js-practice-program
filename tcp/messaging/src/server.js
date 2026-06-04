const staticMessage = {
  clearScreen: "\x1b[2J\x1b[H",
};

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const readData = async (conn) => {
  const buffer = new Uint8Array(1024);
  const count = await conn.read(buffer);

  if (count) {
    const data = decoder.decode(buffer.slice(0, count));
    return { isClosed: false, data };
  }

  return { isClosed: true, data: "" };
};

const writeData = async (con, data) => {
  const encodedData = encoder.encode(data);
  await con.write(encodedData);
};

const showAllData = (conn, data) => {
  const toWrite = staticMessage.clearScreen + `${data}\n\r\n\r >> `;
  writeData(conn, toWrite);
};

const dataHandler = () => {
  const data = [];
  let isConnClosed = false;
  return {
    addNewData: (message) => {
      data.push(message);
    },
    getAllData: () => {
      return [...data];
    },
    setClosed: () => {
      isConnClosed = true;
    },
    isClosed: () => isConnClosed,
  };
};

const broadCastUpdateToClient = (conn, handler, id) => {
  const totalData = handler.getAllData()
    .map(({ message, by }) => (by === id ? " >> " : `${by} >> `) + message)
    .join("\r\n");

  showAllData(conn, totalData);
};

const handlerIncommingAsync = async (conn, handler, id) => {
  while (true) {
    const { data, isClosed } = await readData(conn);

    if (isClosed) {
      handler.setClosed(true);
      return;
    }

    handler.addNewData({ by: id++, message: data.trim() });

    console.log(`Receied >>> "${data.trim()}"`);

    broadCastUpdateToClient(conn, handler, id);
  }
};

const delay = async (time) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
};

const handlerSendingAsync = async (conn, handler, id) => {
  let count = 0;
  while (!handler.isClosed()) {
    const data = `This is the server ${count++}`;
    console.log(`Sending >>> "${data}"`);
    handler.addNewData({ by: "Server", message: data.trim() });
    broadCastUpdateToClient(conn, handler, id);
    await delay(1000);
  }
};

const handlerConnection = async (conn) => {
  const id = 0;
  const handler = dataHandler();

  handlerIncommingAsync(conn, handler, id);
  handlerSendingAsync(conn, handler, id);
};

export const serve = async () => {
  const listener = await Deno.listen({ port: 8000, hostname: "0.0.0.0" });
  console.log(listener);

  for await (const conn of listener) {
    console.log("Connected");
    handlerConnection(conn);
  }
};
