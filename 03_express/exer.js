// @ts-check
const express = require('express');

const server = express();

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`${PORT} 번 실행 중`);
});

server.get(
  '/email/:email/password/:password/name/:name/gender/:gender',
  (req, res) => {
    console.log(req.params);
    res.send(req.params);
  }
);

server.get('/', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
