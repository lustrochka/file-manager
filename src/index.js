import { createInterface } from 'readline/promises';
import os from 'os';
import Navigation from './navigation';

class Main {
  #username;
  #nwd;

  constructor() {
    this.#username = 'username';
    this.#nwd = new Navigation();
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
