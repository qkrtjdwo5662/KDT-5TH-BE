// 외부모듈
const express = require('express'); // express 선언
const bodyParser = require('body-parser');
// express 변수화
const app = express();

// 라우터 선언
const boardRouter = require('./routes/board');

// 포트번호
const PORT = 4000;

// 프로젝트 세팅
app.set('view engines', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터 등록
app.use('/board', boardRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(`${err.message} <a href="/">돌아가</a>`);
});

app.listen(PORT, () => {
  console.log(`${PORT}번 시작`);
});
