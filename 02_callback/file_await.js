const fs = require('fs').promises;

async function main() {
  let data = await fs.readFile('t1.txt', 'utf-8');
  console.log('1번', data.toString());
  data = await fs.readFile('t2.txt', 'utf-8');
  console.log('2번', data.toString());
  data = await fs.readFile('t3.txt', 'utf-8');
  console.log('3번', data.toString());
  data = await fs.readFile('t4.txt', 'utf-8');
  console.log('4번', data.toString());
}

main();
