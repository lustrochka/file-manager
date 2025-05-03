import { createInterface } from 'readline/promises';

let username = "username";
process.argv.forEach((arg) => {if (arg.startsWith("--username")) username = arg.split('=')[1]});
console.log(`Welcome to the File Manager, ${username}!`);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.on('close', () => {
    closeProgram()
});

rl.on('line', (input) => {
    if (input === ".exit") closeProgram()
});

function closeProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}