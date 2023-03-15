// @ts-check
const express = require('express');

const app = express();
const userRouter = express.Router();

const PORT = 4000;

const USER = {
  1: {
    email: 'qkrtjdwo5662',
    name: 'park',
  },
};

app.get('/', (req, res) => {
  res.send(USER);
});

app.use('/users', userRouter); // '/users'의 페이지 처리를 userRouter로 처리
userRouter.put('/modify/:id', (req, res) => {
  // 'modify/req.params.id' 처리
  if (USER[req.params.id]) {
    console.log('존재 X');
    res.send('수정 실패');
  } else {
    USER[req.params.id].email = req.query.email;
    USER[req.params.id].name = req.query.name;
    res.send('수정완료');
  }
});
userRouter.delete('/delete/:id', (req, res) => {
  if (!USER[req.params.id]) {
    console.log('존재하지 않음');
    res.send('삭제 실패');
  }
  delete USER[req.params.id];
  res.send('삭제완료');
});

// 포트
app.listen(PORT, () => {
  console.log(`${PORT}실행`);
});
