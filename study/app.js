const express = require('express'); // express 프레임워크 사용 선언
const bodyParser = require('body-parser');

const app = express(); // express를 server라는 이름으로 변수화

const userRouter = require('./routes/users'); // '/users'요청 처리를 위한 userRouter

const PORT = 4000; // 4000번 포트

app.set('view engine', 'ejs'); // ejs로 웹페이지 구성
app.use(express.static('public')); // public로 상위 폴더 변경

// body-parser 관련
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 라우터 관련
app.use('/users', userRouter); // '/users' userRouter로 처리

app.listen(PORT, () => {
  console.log(`포트번호 ${PORT}번 실행`);
});
