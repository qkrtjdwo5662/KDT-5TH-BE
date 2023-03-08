// // @ts-check
// const express = require('express');

// const server = express();

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`익스프레스 서버는 ${PORT}번 포트에서 작동 중입니다!`);
// });

const express = require('express');

const server = express();

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`${PORT}번 시작`);
});
