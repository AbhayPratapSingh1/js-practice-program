export const delay = async (duration) => {
  await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, duration);
  });
};

const connection = async () => {
  const connection = await Deno.connect({
    hostname: "127.0.0.1",
    port: 8000,
    transport: "tcp",
  });

  while (true) {
    console.log("connect");
    await delay(500);
  }
};

connection();
