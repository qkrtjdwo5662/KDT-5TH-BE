// @ts-check
// 외부 모듈
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// 내부 모듈
// 라우터
const mainRouter = require('./routes');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/data');

const PORT = 4000;

app.set('view engine', 'ejs'); // ejs로 웹페이지 구성
app.use(express.static('public')); // public로 상위 폴더 변경
// body-parser 관련
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터 등록
app.use('/', mainRouter);
app.use('/users', userRouter); // '/users' userRouter로 처리
app.use('/posts', postRouter);
app.use('/board', boardRouter);
app.use('/data', dataRouter);

// 에러 처리
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(`${err.message} <a href="/">돌아가</a>`);
});

// 포트 연결
app.listen(PORT, () => {
  console.log(`포트번호 ${PORT}번 실행`);
});
