// @ts-check
// 외부 모듈
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();

// 내부 모듈
// 라우터
const mainRouter = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/data');
const cookieRouter = require('./routes/cookie');

const sqlBoardRouter = require('./routes/SQL_Board');
const sqlUsersRouter = require('./routes/SQL_Users');
const mongoBoardRouter = require('./routes/Mongo_Board');
const mongoUsersRouter = require('./routes/Mongo_Users');
const sqlLoginRouter = require('./routes/SQL_Login');
const sqlRegisterRouter = require('./routes/SQL_Register');
const mongoLoginRouter = require('./routes/Mongo_Login');
const mongoRegisterRouter = require('./routes/Mongo_Register');
// const testLoginRouter = require('./routes/testlogin');

const { PORT } = process.env;

app.set('view engine', 'ejs'); // ejs로 웹페이지 구성
app.use(express.static('public')); // public로 상위 폴더 변경
// body-parser 관련
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie-parser 관련
app.use(cookieParser('park'));
app.use(
  session({
    secret: 'park', // 세션 발급 시 사용되는 키 값
    resave: false, // request마다 자동 저장하는지
    saveUninitialized: true,
  }),
);

// 라우터 등록
app.use('/', mainRouter);
app.use('/users', userRouter); // '/users' userRouter로 처리
app.use('/posts', postRouter);
app.use('/board', boardRouter);
app.use('/data', dataRouter);
app.use('/cookie', cookieRouter);

app.use('/sqlBoard', sqlBoardRouter);
app.use('/sqlUsers', sqlUsersRouter);
app.use('/mongoBoard', mongoBoardRouter);
app.use('/mongoUsers', mongoUsersRouter);

app.use('/sqlLogin', sqlLoginRouter);
app.use('/sqlRegister', sqlRegisterRouter);
app.use('/mongoLogin', mongoLoginRouter);
app.use('/mongoRegister', mongoRegisterRouter);

// app.use('/testlogin', testLoginRouter);

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
