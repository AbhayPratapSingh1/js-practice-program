const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const delay = async (duration) => {
  await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, duration);
  });
};

const handleConnection = async () => {
  const listener = Deno.listen({
    hostname: "127.0.0.1",
    port: 8000,
    transport: "tcp",
  });

  const connections = [];
  for await (const conn of listener) {
    connections.push(conn);
    console.log("here");

    if (connections.length === 2) {
      break;
    }
  }
  // listener.close();

  while (true) {
    console.log("Got 2 connections");
    await delay(500);
  }
};
handleConnection();
