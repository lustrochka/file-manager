import fs from 'node:fs';
import { promises } from 'fs';
import path from 'path';

class Files {
  read(path) {
    return new Promise((resolve, reject) => {
      const fileReadStream = fs.createReadStream(path);
      fileReadStream.on('data', (chunk) => {
        process.stdout.write(chunk.toString());
      });
      fileReadStream.on('end', () => {
        process.stdout.write('\n');
        resolve();
      });
      fileReadStream.on('error', (err) => {
        reject(err.message);
      });
    });
  }

  async create(name) {
    const filePath = path.join(process.cwd(), name);
    await promises.writeFile(filePath, '');
    console.log('File created');
  }

  async mkdir(name) {
    const dirPath = path.join(process.cwd(), name);
    await promises.mkdir(dirPath, { recursive: true });
    console.log('Folder created');
  }

  async rename(oldName, newName) {
    await promises.rename(oldName, newName);
    console.log('File Renamed');
  }

  move(oldPath, newDir, shouldRemove = false) {
    return new Promise((resolve, reject) => {
      const newPath = path.join(newDir, path.basename(oldPath));

      const fileReadStream = fs.createReadStream(oldPath);
      fileReadStream.on('error', (err) => {
        reject(err.message);
      });

      const fileWriteStream = fs.createWriteStream(newPath);
      fileWriteStream.on('error', (err) => {
        reject(err.message);
      });
      fileWriteStream.on('close', () => {
        if (shouldRemove) this.delete(oldPath, true);
        else {
          console.log('File copied');
          resolve();
        }
      });
      fileReadStream.pipe(fileWriteStream);
    });
  }

  async delete(path, isMoving = false) {
    await promises.unlink(path);
    isMoving ? console.log('File moved') : console.log('File deleted');
  }
}

export default Files;
