// @ts-check
const express = require('express');
const cors = require('cors');

const PORT = 4000;

const app = express();

app.use(cors());

app.use('/', (req, res) => {
  const str = '안녕하세요. 백엔드 입니다.';
  const json = JSON.stringify(str);
  res.send(json);
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 실행 중!`);
});
