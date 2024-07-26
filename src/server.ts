import * as net from "net";
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

net
  .createServer((socket) => {
    socket.on("data", async (buffer) => {
      const request = buffer.toString();
      const [requestLine] = request.split("\r\n");
      const [method, url] = requestLine.split(" ");

      let filePath = './public' + url;
      if (url === '/') {
        filePath = './public/index.html';
      }

      try {
        const { data: bodyHTML, contentType } = await pool.exec('getFile', [filePath]);

        const responseHeaders = new Map<string, string>();
        responseHeaders.set("Content-Type", contentType);
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
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        socket.end();
      }
    });
  })
  .listen(PORT, IP, BACKLOG, () => {
    console.log(`Server is listening on http://${IP}:${PORT}`);
  });