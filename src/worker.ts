import * as fs from 'fs';
import * as path from 'path';
import * as workerpool from 'workerpool';
import { contentTypes } from './contentTypes';
import { Response } from './server';

const getFile = (filePath: string): Promise<{ data: string, contentType: string }> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = contentTypes[ext] || 'text/html';
        resolve({ data: data.toString(), contentType });
      }
    });
  });
};

const compileResponse = (response: Response): string => {
  const headers = Array.from(response.headers)
    .map((kv) => `${kv[0]}: ${kv[1]}`)
    .join("\r\n");
  return `${response.protocol} ${response.statusCode} ${response.status}\r\n${headers}\r\n\r\n${response.body}`;
};

workerpool.worker({
  compileResponse,
  getFile
});