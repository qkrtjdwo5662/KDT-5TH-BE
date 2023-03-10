const express = require('express');
// express 프레임워크 사용 선언
const bodyParser = require('body-parser');

const app = express();
// express를 server라는 이름으로 변수화

const postRouter = require('./routes/posts');
// post관련 요청처리 라우터
app.set('view engine', 'ejs'); // ejs로 웹 페이지 구성 선언
app.use(express.static('public')); // public로 상위 폴더 변경
// body-parser 관련
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 4000;

app.use('/post', postRouter);
// '/post' 요청처리 postRouter등록

app.listen(PORT, () => {
  console.log(`포트번호 ${PORT}번 실행`);
});
