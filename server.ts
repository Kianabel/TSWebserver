import * as net from "net";
import * as fs from "fs";
import * as workerpool from "workerpool";
import Pool from "workerpool/types/Pool";

const pool: Pool = workerpool.pool('./dist/worker.js');

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

const getBody = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile("./public/index.html", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

net
  .createServer((socket) => {
    socket.on("data", async (buffer) => {
      const request = buffer.toString();

      try {
        const bodyHTML = await getBody();

        const responseHeaders = new Map<string, string>();
        responseHeaders.set("Content-Type", "text/html");
        responseHeaders.set("Content-Length", bodyHTML.length.toString());

        const response: Response = {
          protocol: "HTTP/1.1",
          headers: responseHeaders,
          status: "OK",
          statusCode: 200,
          body: bodyHTML,
        };

        const compiledResponse = await pool.exec('compileResponse', [response]);

        socket.write(compiledResponse);
        socket.end();
      } catch (err) {
        console.error("Error reading file:", err);
        socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
        socket.end();
      }
    });
  })
  .listen(PORT, IP, BACKLOG, () => {
    console.log(`Server is listening on http://${IP}:${PORT}`);
  });
