import os from 'os';

class System {
  start(input) {
    switch (input) {
      case '--EOL':
        this.printEOL();
        break;
      case '--cpus':
        this.printCPUS();
        break;
      case '--homedir':
        this.printHomeDir();
        break;
      case '--username':
        this.printUsername();
        break;
      case '--architecture':
        this.printArch();
        break;
      default:
        console.log('Invalid input');
    }
  }

  printEOL() {
    console.log(`default system End-Of-Line: ${JSON.stringify(os.EOL)}`);
  }

  printCPUS() {
    const cpus = os.cpus();
    console.log(`Total amount: ${cpus.length}`);
    cpus.forEach((cpu) => {
      console.log(
        `Model: ${cpu.model}| clock rate: ${(cpu.speed / 1000).toFixed(2)}`
      );
    });
  }

  printHomeDir() {
    console.log(`home directory: ${os.homedir()}`);
  }

  printUsername() {
    console.log(`current system user name: ${os.userInfo().username}`);
  }

  printArch() {
    console.log(`CPU architecture: ${process.arch}`);
  }
}

export default System;
