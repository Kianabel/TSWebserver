import * as workerpool from 'workerpool';
import { Response } from './server';

const compileResponse = (response: Response): string => {
  const headers = Array.from(response.headers)
    .map((kv) => `${kv[0]}: ${kv[1]}`)
    .join("\r\n");
  return `${response.protocol} ${response.statusCode} ${response.status}\r\n${headers}\r\n\r\n${response.body}`;
};

workerpool.worker({
  compileResponse
});
