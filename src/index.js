import { createInterface } from 'readline/promises';
import os from 'os';
import Navigation from './navigation.js';
import Files from './files.js';
import System from './system.js';
import Hash from './hash.js';

class Main {
  #username;
  #nwd;
  #fs;
  #os;
  #hash;

  constructor() {
    this.#username = 'username';
    this.#nwd = new Navigation();
    this.#fs = new Files();
    this.#os = new System();
    this.#hash = new Hash();
  }

  start() {
    process.chdir(os.homedir());
    this.showGreeting();

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('close', () => {
      this.closeProgram();
    });

    rl.on('line', (input) => {
      if (input === '.exit') {
        this.closeProgram();
      } else {
        this.chooseCommand(input);
      }
    });
  }

  showGreeting() {
    process.argv.forEach((arg) => {
      if (arg.startsWith('--username')) this.#username = arg.split('=')[1];
    });
    console.log(`Welcome to the File Manager, ${this.#username}!`);
    this.printPath();
  }

  closeProgram() {
    console.log(
      `Thank you for using File Manager, ${this.#username}, goodbye!`
    );
    process.exit(0);
  }

  printPath() {
    console.log(`You are currently in ${process.cwd()}`);
  }

  chooseCommand(input) {
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
          this.#nwd.showList();
          break;
        case 'cat':
          this.#fs.read(args[0]);
          break;
        case 'add':
          this.#fs.create(args[0]);
          break;
        case 'mkdir':
          this.#fs.mkdir(args[0]);
          break;
        case 'rn':
          this.#fs.rename(args[0], args[1]);
          break;
        case 'cp':
          this.#fs.move(args[0], args[1]);
          break;
        case 'mv':
          this.#fs.move(args[0], args[1], true);
          break;
        case 'rm':
          this.#fs.delete(args[0]);
          break;
        case 'os':
          this.#os.start(args[0]);
          break;
        case 'hash':
          this.#hash.calcHash(args[0]);
          break;
        default:
          console.log('Invalid input');
      }
    } catch {
      console.log('Operation failed');
    }
    this.printPath();
  }
}

new Main().start();
