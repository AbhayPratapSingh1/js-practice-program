const connection = await Deno.connect({
  hostname: "10.132.126.98",
  port: 8000,
  transport: "tcp",
});

const decoder = new TextDecoder();
const encoder = new TextEncoder();

let isAlive = true;

const draw = (buff) => {
  const id = setInterval(async () => {
    const n = await connection.read(buff);
    console.clear();
    const frame = decoder.decode(buff.slice(0, n));
    console.log(frame);
    if (frame === "you died") {
      clearInterval(id);
      isAlive = false;
      connection.close();
      return;
    }
  }, 100);
};

const debugLogs = await Deno.open("./logs.txt", { append: true, create: true });

const writeToLogFile = async (msg) => {
  await debugLogs.write(encoder.encode(`${msg}\n`));
};

const write = async (buff) => {
  while (true) {
    const n = await Deno.stdin.read(buff);
    if (!isAlive) {
      return;
    }
    await connection.write(buff.slice(0, n));
  }
};

const main = async () => {
  const buff = new Uint8Array(10);
  let msg = "";
  while (true) {
    const n = await connection.read(buff);
    msg = decoder.decode(buff.slice(0, n));
    console.log(msg);
    if (msg === "start") {
      break;
    }
    const bytes = prompt(" : ");
    console.log(bytes);
    await connection.write(encoder.encode(bytes));
  }
  Deno.stdin.setRaw(true, { cbreak: true });
  console.log(true);

  draw(buff);
  write(buff);
};

try {
  await main();
} finally {
  Deno.stdin.setRaw(false);
}
