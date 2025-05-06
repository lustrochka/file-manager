import { promises as fs } from 'fs';

class Navigation {
  async showList() {
    const folders = [];
    const files = [];

    let items = await fs.readdir(process.cwd(), { withFileTypes: true });
    for (const item of items) {
      item.isDirectory() ? folders.push(item.name) : files.push(item.name);
    }

    folders.sort((a, b) => a.localeCompare(b));
    files.sort((a, b) => a.localeCompare(b));
    let index = 0;

    console.log(`Index| Name                 | Type`);
    console.log(`-----|----------------------|--------`);

    folders.forEach((x) =>
      console.log(`${(index++).toString().padEnd(5)}|${x.padEnd(22)}| folder`)
    );
    files.forEach((x) =>
      console.log(`${(index++).toString().padEnd(5)}|${x.padEnd(22)}| file`)
    );
  }
}

export default Navigation;
