import * as net from "net";
import * as fs from "fs";

export interface Request {
  protocol: string;
  method: string;
  url: string;
  headers: Map<string, string>;
  body: string;
}

export interface Response {
  status: string;
  statusCode: number;
  protocol: string;
  headers: Map<string, string>;
  body: string;
}

const PORT: number = 22222;
const IP: string = "127.0.0.1";
const BACKLOG: number = 521;

const htmlbody = fs.readFileSync("./public/index.html").toString() //converting entry html into string

const responseHeaders = new Map<string, string>(); //html headers
responseHeaders.set("Content-Type", "text/html");
responseHeaders.set("Content-Length", htmlbody.length.toString());

const response: Response = {
  protocol: "HTTP/1.1",
  headers: responseHeaders,
  status: "OK",
  statusCode: 200,
  body: htmlbody,
};

const compileResponse = (r: Response): string => {
  const headers = Array.from(r.headers)
    .map((kv) => `${kv[0]}: ${kv[1]}`)
    .join("\r\n");
  return `${r.protocol} ${r.statusCode} ${r.status}\r\n${headers}\r\n\r\n${r.body}`;
};

net
  .createServer((socket) => {
    socket.on("data", (buffer) => {
      const request = buffer.toString();
      socket.write(compileResponse(response));
      socket.end();
    });
  })
  .listen(PORT, IP, BACKLOG, () => {
    console.log(`Server is listening on http://${IP}:${PORT}`);
  });
