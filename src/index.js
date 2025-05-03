import { createInterface } from 'readline/promises';
import os from "os";
import { promises as fs } from 'fs'

process.chdir(os.homedir());

let username = "username";
process.argv.forEach((arg) => {if (arg.startsWith("--username")) username = arg.split('=')[1]});
console.log(`Welcome to the File Manager, ${username}!`);
printPath();

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.on('close', () => {
    closeProgram()
});

rl.on('line', (input) => {
    if (input === ".exit") {
        closeProgram();
    } else {
        const [command, ...args] = input.split(' ');
        try {
            switch (command) {
                case "up":
                    process.chdir('..');
                    break;
                case "cd":
                    process.chdir(args[0]);
                    break;
                case "ls":
                    showList();
                    break;
                default:
                    console.log('Invalid input');
                }
            } catch {
                console.log('Operation failed');
            }
        printPath();
    }
});

function closeProgram() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}

function printPath() {
    console.log(`You are currently in ${process.cwd()}`);
}

async function showList() {
    const folders = [];
    const files = [];
    try {
        let items = await fs.readdir(process.cwd(), { withFileTypes: true });
        for (const item of items) {
            item.isDirectory() ? folders.push(item.name) : files.push(item.name);
        }

        folders.sort((a, b) => a.localeCompare(b));
        files.sort((a, b) => a.localeCompare(b));
        let index = 0;
        console.log(`Index| Name                 | Type`);
        console.log(`-----|----------------------|--------`);
        folders.forEach((x) => console.log(`${(index++).toString().padEnd(5)}|${x.padEnd(22)}| folder`));
        files.forEach((x) => console.log(`${(index++).toString().padEnd(5)}|${x.padEnd(22)}| file`));
    } catch {
        console.log('Operation failed');
    }
}