// const test = [1, 2, 3, 4, 5];

// for (let i = 0; i < 5; i += 1) {
//   console.log(test.pop());
// }

// const x = 1;
// console.log(x);

// @ts-check

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('hello');
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`서버는 ${PORT}번 포트에서 작동 중`);
});
