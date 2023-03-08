import { Readable } from "node:stream";

class oneToHundredStream extends Readable {
  index = 1;

  _read() {
    const counter = this.index++;

    if (counter > 100) return this.push(null);

    const buff = Buffer.from(String(counter));

    this.push(buff);
  }
}

new oneToHundredStream().pipe(process.stdout);
