const decoder = new TextDecoder();

const parseHeader = (rawHeader) => {
  const headers = {};
  for (const record of rawHeader) {
    const [key, ...value] = record.split(":");
    headers[key] = value.join(":").trim();
  }
  return headers;
};

export const readRequest = async (conn) => {
  const buffer = new Uint8Array(1024);
  const count = await conn.read(buffer);
  const request = decoder.decode(buffer.slice(0, count));
  return request;
};

export const parseRequest = (request) => {
  const [metaDetails, content] = request.split("\r\n\r\n");

  const [requestLine, ...rawHeaders] = metaDetails.split("\r\n");

  const headers = parseHeader(rawHeaders);

  const [method, path, protocol] = requestLine.split(" ");

  return { method, path, protocol, headers, content };
};
