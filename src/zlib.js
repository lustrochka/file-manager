import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

class Zlib {
  async compress(command, path, newPath) {
    const fileReadStream = createReadStream(path);
    const fileWriteStream = createWriteStream(newPath);
    const brotli =
      command === 'compress'
        ? createBrotliCompress()
        : createBrotliDecompress();
    await pipeline(fileReadStream, brotli, fileWriteStream);
    console.log(`File ${command}ed`);
  }
}

export default Zlib;
