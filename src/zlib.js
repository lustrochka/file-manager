import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

class Zlib {
  async compress(command, path, newPath) {
    try {
      const fileReadStream = createReadStream(path);
      const fileWriteStream = createWriteStream(newPath);
      const brotli =
        command === 'compress'
          ? createBrotliCompress()
          : createBrotliDecompress();
      await pipeline(fileReadStream, brotli, fileWriteStream);
      console.log(`File ${command}ed`);
    } catch (error) {
      console.error('Operation failed', error.message);
    }
  }
}

export default Zlib;
