const encoder = new TextEncoder();
const decoder = new TextDecoder();

const main = async () => {
  
  const connection = await Deno.connect({
    hostname: "127.0.0.1",
    port: 8000,
    transport: "tcp",
  });

  const buff = new Uint8Array(1024);

  const myData = {
    action: "something",
    args: {
      counterName: "somethings2",
    },
  };

  const parsedData = encoder.encode(JSON.stringify(myData));
  connection.write(parsedData);
};

main();
