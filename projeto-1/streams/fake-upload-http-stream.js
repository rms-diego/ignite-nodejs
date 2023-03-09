import { Readable } from "node:stream";

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

fetch("http://localhost:3333", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half", // adicione essa linha
});
