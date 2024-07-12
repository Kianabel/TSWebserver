import * as net from "net";

const PORT: number = 22222;
const IP: string = "127.0.0.1";
const BACKLOG: number = 100;

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

// const parseRequest = (s: string): Request => { //parser for request
//   const [firstLine, rest] = divideStringOn(s, '\r\n');
//   const [method, url, protocol] = firstLine.split(' ', 3);
//   const [headers, body] = divideStringOn(rest, '\r\n\r\n');
//   const parsedHeaders = headers.split('\r\n').reduce((map, header) => {
//     const [key, value] = divideStringOn(header, ': ');
//     return map.set(key, value);
//   }, new Map());
//   return { protocol, method, url, headers: parsedHeaders, body };
// };

// const divideStringOn = (s: string, search: string) => {
//   const index = s.indexOf(search);
//   const first = s.slice(0, index);
//   const rest = s.slice(index + search.length);
//   return [first, rest];
// };

const compileResponse = (r: Response): string => {
  const headers = Array.from(r.headers).map(kv => `${kv[0]}: ${kv[1]}`).join('\r\n');
  return `${r.protocol} ${r.statusCode} ${r.status}\r\n${headers}\r\n\r\n${r.body}`;
};

net.createServer(socket => {
  socket.on('data', buffer => {
    const request = buffer.toString();
    const responseHeaders = new Map<string, string>();
    responseHeaders.set('Content-Type', 'text/html');
    responseHeaders.set('Content-Length', '<html><body><h1>GangGang</h1></body></html>'.length.toString());

    const response: Response = {
      protocol: 'HTTP/1.1',
      headers: responseHeaders,
      status: 'OK',
      statusCode: 200,
      body: `<html><body><h1>GangGang</h1></body></html>`
    };

    socket.write(compileResponse(response));
    socket.end();
  });
}).listen(PORT, IP, BACKLOG, () => {
  console.log(`Server is listening on ${IP}:${PORT}`);
});
