import { readData, writeData } from "./server.js";

const handlerConnection = async (conn) => {
  while (true) {
    const { data, isClosed } = await readData(conn);
    if (isClosed) {
      return;
    }
    console.log(`Receied >>> ${data.trim()}`);
    console.log(`Sending >>> ${data.trim()}`);
    console.log();
    writeData(conn, data);
  }
};
exports.handlerConnection = handlerConnection;
