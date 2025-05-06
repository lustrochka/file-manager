import Navigation from './navigation.js';
import Files from './files.js';
import System from './system.js';
import Hash from './hash.js';
import Zlib from './zlib.js';

class Controller {
  #nwd;
  #fs;
  #os;
  #hash;
  #zlib;

  constructor() {
    this.#nwd = new Navigation();
    this.#fs = new Files();
    this.#os = new System();
    this.#hash = new Hash();
    this.#zlib = new Zlib();
  }

  async chooseCommand(input) {
    const [command, ...args] = input.split(' ');
    try {
      switch (command) {
        case 'up':
          process.chdir('..');
          break;
        case 'cd':
          process.chdir(args[0]);
          break;
        case 'ls':
          await this.#nwd.showList();
          break;
        case 'cat':
          await this.#fs.read(args[0]);
          break;
        case 'add':
          await this.#fs.create(args[0]);
          break;
        case 'mkdir':
          await this.#fs.mkdir(args[0]);
          break;
        case 'rn':
          await this.#fs.rename(args[0], args[1]);
          break;
        case 'cp':
          await this.#fs.move(args[0], args[1]);
          break;
        case 'mv':
          await this.#fs.move(args[0], args[1], true);
          break;
        case 'rm':
          await this.#fs.delete(args[0]);
          break;
        case 'os':
          await this.#os.start(args[0]);
          break;
        case 'hash':
          await this.#hash.calcHash(args[0]);
          break;
        case 'compress':
        case 'decompress':
          await this.#zlib.compress(command, args[0], args[1]);
          break;
        default:
          console.log('Invalid input');
      }
    } catch (err) {
      console.log('Operation failed:', err.message);
    } finally {
      this.printPath();
    }
  }

  printPath() {
    console.log(`You are currently in ${process.cwd()}`);
  }
}

export default Controller;
