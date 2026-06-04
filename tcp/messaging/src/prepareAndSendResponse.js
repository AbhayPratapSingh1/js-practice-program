const encoder = new TextEncoder();

const STATUS_MESSAGE = {
  200: "OK",
};

const prepareRequestLine = (protocol, statusCode) => {
  const statusMsg = STATUS_MESSAGE[statusCode] || "INVALID";
  return `${protocol} ${statusCode} ${statusMsg}`;
};

const prepareHeader = (headers) => {
  return Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\r\n");
};

export const prepareResponce = (request, { statusCode, body, headers }) => {
  const requestLine = prepareRequestLine(request.protocol, statusCode);
  const header = prepareHeader(headers);

  const response = [
    requestLine,
    header,
    "",
    body,
  ].join("\r\n");

  return encoder.encode(response);
};
