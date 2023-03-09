import { Readable, Transform, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const counter = this.index++;

    setTimeout(() => {
      if (counter > 100) return this.push(null);

      const buff = Buffer.from(String(counter));

      this.push(buff);
    }, 1000);
  }
}

class MultiplyByTemStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
  .pipe(new InvertNumberStream())
  .pipe(new MultiplyByTemStream());
