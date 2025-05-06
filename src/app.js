import { createInterface } from 'readline/promises';
import os from 'os';
import Controller from './controller.js';

class App {
  #username;
  #controller;

  constructor() {
    this.#username = 'username';
    this.#controller = new Controller();
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
        this.#controller.chooseCommand(input);
      }
    });
  }

  showGreeting() {
    process.argv.forEach((arg) => {
      if (arg.startsWith('--username')) this.#username = arg.split('=')[1];
    });
    console.log(`Welcome to the File Manager, ${this.#username}!`);
    console.log(`You are currently in ${process.cwd()}`);
  }

  closeProgram() {
    console.log(
      `Thank you for using File Manager, ${this.#username}, goodbye!`
    );
    process.exit(0);
  }
}

export default App;
