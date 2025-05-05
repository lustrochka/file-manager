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
    try {
      await pipeline(
        createReadStream(path),
        createHash('sha256').setEncoding('hex'),
        echo
      );
    } catch (err) {
      console.error(`Operation failed: ${err.message}`);
    }
  }
}

export default Hash;
