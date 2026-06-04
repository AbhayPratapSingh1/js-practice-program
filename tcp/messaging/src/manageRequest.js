import { readTextFile } from "./utilities.js";
import { filePathRouter } from "./filePathRouter.js";
class HttpResponse {
  #headers;
  #statusCode;
  #body;
  constructor() {
    this.#headers = {};
    this.#statusCode = 404;
    this.#body = "";
  }

  setBody(content) {
    this.#headers["Content-Length"] = content.length;
    this.#body = content;
    console.log(content);
  }

  setHtml(content) {
    this.#headers["Content-type"] = "text/html";
    this.setBody(content);
  }

  setJson(content) {
    this.#headers["Content-type"] = "application/json";

    this.setBody(JSON.stringify(content));
  }

  setStatus(code) {
    this.#statusCode = code;
  }

  getResponce() {
    return {
      statusCode: this.#statusCode,
      body: this.#body,
      headers: this.#headers,
    };
  }
}

const getHtmlPage = (request, path) => {
  const response = new HttpResponse();

  const { data } = readTextFile(path);

  response.setHtml(data);
  response.setStatus(200);
  return response.getResponce();
};

const getJsonData = (request, path) => {
  const response = new HttpResponse();

  const { data } = readTextFile(path);

  const parsedData = JSON.parse(data);
  response.setJson(parsedData);
  response.setStatus(200);
  return response.getResponce();
};

const notFoundPage = () => {
  const response = new HttpResponse();
  const { data, isError } = readTextFile(filePathRouter["/not-found"].path);
  console.log(data, filePathRouter["/not-found"]);

  if (!isError) {
    response.setHtml(data);
    response.setStatus(404);
    return response.getResponce();
  }

  response.setHtml("<h1>Not Found</h1>");
  response.setStatus(404);
  return response.getResponce();
};

const isFileExist = (path) => {
  try {
    Deno.stat(path);
    return true;
  } catch {
    return false;
  }
};

const isValidType = (type) => {
  return ["html", "json"].includes(type);
};

const isInValid = (requestedPath) => {
  const pageDetails = filePathRouter[requestedPath];

  if (!pageDetails) {
    return true;
  }

  const { type, path } = pageDetails;
  return !isValidType(type) || !isFileExist(path);
};

export const manageGETRequest = (request) => {
  if (isInValid(request.path)) {
    return notFoundPage();
  }

  const { path, type } = filePathRouter[request.path];

  switch (type) {
    case "html":
      return getHtmlPage(request, path);
    case "json":
      return getJsonData(request, path);
  }
};

export const requestHandler = (request) => {
  if (request.method === "GET") {
    return manageGETRequest(request);
  }
  return notFoundPage(request);
};
