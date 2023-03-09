import http from "node:http";
import { Transform } from "node:stream";

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer((request, response) => {
  return request.pipe(new InvertNumberStream()).pipe(response);
});

server.listen(3333, () => console.log("Server up\nOn port: " + 3333));
