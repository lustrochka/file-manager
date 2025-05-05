import fs from 'node:fs';
import path from 'path';

class Files {
  read(path) {
    const fileReadStream = fs.createReadStream(path);
    fileReadStream.on('data', (chunk) => {
      process.stdout.write(chunk.toString());
    });
    fileReadStream.on('end', () => {
      process.stdout.write('\n');
    });
    fileReadStream.on('error', (err) => {
      console.error('Operation failed:', err.message);
    });
  }

  create(name) {
    const filePath = path.join(process.cwd(), name);
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        console.error('Operation failed:', err.message);
      } else {
        console.log('File created');
      }
    });
  }

  mkdir(name) {
    const dirPath = path.join(process.cwd(), name);
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Operation failed:', err.message);
      } else {
        console.log('Folder created');
      }
    });
  }

  rename(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
      if (err) {
        console.error('Operation failed:', err.message);
      } else {
        console.log('File Renamed');
      }
    });
  }

  move(oldPath, newDir, shouldRemove = false) {
    const newPath = path.join(newDir, path.basename(oldPath));

    const fileReadStream = fs.createReadStream(oldPath);
    fileReadStream.on('error', (err) => {
      console.error('Operation failed:', err.message);
    });

    const fileWriteStream = fs.createWriteStream(newPath);
    fileWriteStream.on('error', (err) => {
      console.error('Operation failed:', err.message);
    });
    fileWriteStream.on('close', () => {
      shouldRemove ? this.delete(oldPath, true) : console.log('File copied');
    });
    fileReadStream.pipe(fileWriteStream);
  }

  delete(path, isMoving = false) {
    fs.unlink(path, (err) => {
      if (err) console.error('Operation failed:', err.message);
      else isMoving ? console.log('File moved') : console.log('File deleted');
    });
  }
}

export default Files;
