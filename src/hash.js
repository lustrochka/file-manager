import { pipeline } from 'stream/promises';
import { Writable } from 'stream';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

class Hash {
  async calcHash(path) {
    let echo = new Writable({
      write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
      }
    });
    await pipeline(
      createReadStream(path),
      createHash('sha256').setEncoding('hex'),
      echo
    );
  }
}

export default Hash;
