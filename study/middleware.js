const express = require('express');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  console.log('get 요청');
  res.send('get 요청 응답');
});

app.use('/', (req, res) => {
  console.log('미들웨어 요청');
  res.send('use 요청 응답');
}); // 미들웨어 사용

app.use((req, res) => {
  console.log('middleware 2');
  console.log(req.fileContent);
  res.send(`요청 응답 ${req.reqTime}`);
}); // 미들웨어 사용

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
